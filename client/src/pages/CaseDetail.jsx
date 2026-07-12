import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import VideoEmbed from '../components/ui/VideoEmbed';
import ImageGallery from '../components/ui/ImageGallery';
import { Skeleton } from '../components/ui/Skeleton';

const sectionTitles = { task: 'Задача', solution: 'Решение', result: 'Результат' };

export default function CaseDetail() {
  const { slug } = useParams();
  const [caseItem, setCaseItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/cases/slug/${slug}`)
      .then(({ data }) => setCaseItem(data))
      .catch(() => setCaseItem(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="section-pad container-tb">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="section-pad container-tb text-center">
        <h1 className="heading-2">Кейс не найден</h1>
        <Link to="/cases" className="btn-primary mt-6 inline-flex">
          К списку кейсов
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={caseItem.title} description={caseItem.result} path={`/cases/${slug}`} />
      <article className="section-pad">
        <div className="container-tb max-w-4xl">
          <Breadcrumbs items={[{ label: 'Кейсы', href: '/cases' }, { label: caseItem.title }]} />
          <p className="font-tech text-[10px] tracking-[.18em] uppercase text-tx3 dark:text-tx-inv3 mb-4">
            {caseItem.client}{caseItem.industry ? ` · ${caseItem.industry}` : ''}
          </p>
          <motion.h1
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="heading-1 mb-8"
          >
            {caseItem.title}
          </motion.h1>

          {caseItem.metrics?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {caseItem.metrics.map((m) => (
                <div key={m.label} className="stat-tb">
                  <p className="font-tech text-2xl bg-g1 bg-clip-text text-transparent">{m.value}</p>
                  <p className="text-[13px] text-tx2 dark:text-tx-inv2 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {['task', 'solution', 'result'].map((key) => (
            caseItem[key] && (
              <section key={key} className="mb-10">
                <p className="eyebrow mb-3">{sectionTitles[key]}</p>
                <p className="text-tx2 dark:text-tx-inv2 leading-relaxed whitespace-pre-line">{caseItem[key]}</p>
              </section>
            )
          ))}

          {caseItem.images?.length > 0 && <ImageGallery images={caseItem.images} />}
          {caseItem.videoType !== 'none' && caseItem.videoUrl && (
            <div className="mt-8">
              <VideoEmbed url={caseItem.videoUrl} type={caseItem.videoType} />
            </div>
          )}

          <div className="mt-14 pt-8 border-t border-paper-line dark:border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <p className="text-tx2 dark:text-tx-inv2">Похожая задача? Обсудим на бесплатной консультации.</p>
            <Link to="/contacts" className="btn-primary">Обсудить проект</Link>
          </div>
        </div>
      </article>
    </>
  );
}
