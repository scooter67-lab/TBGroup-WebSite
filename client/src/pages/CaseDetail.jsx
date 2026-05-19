import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import VideoEmbed from '../components/ui/VideoEmbed';
import ImageGallery from '../components/ui/ImageGallery';

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
    return <div className="section-padding container-narrow animate-pulse h-96 bg-gray-100 rounded-2xl" />;
  }

  if (!caseItem) {
    return (
      <div className="section-padding container-narrow text-center">
        <h1 className="heading-2">Кейс не найден</h1>
        <Link to="/cases" className="btn-primary mt-4 inline-flex">
          К списку кейсов
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={caseItem.title} description={caseItem.result} path={`/cases/${slug}`} />
      <article className="section-padding">
        <div className="container-narrow max-w-4xl">
          <Breadcrumbs items={[{ label: 'Кейсы', href: '/cases' }, { label: caseItem.title }]} />
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-1 mb-2"
          >
            {caseItem.title}
          </motion.h1>
          <p className="text-brand-accent font-medium mb-8">{caseItem.client} · {caseItem.industry}</p>

          {caseItem.metrics?.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-10">
              {caseItem.metrics.map((m) => (
                <div key={m.label} className="glass rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-brand-accent">{m.value}</p>
                  <p className="text-sm text-brand-muted">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {['task', 'solution', 'result'].map((key) => (
            <section key={key} className="mb-8">
              <h2 className="text-xl font-bold mb-3 capitalize">
                {key === 'task' ? 'Задача' : key === 'solution' ? 'Решение' : 'Результат'}
              </h2>
              <p className="text-brand-muted leading-relaxed">{caseItem[key]}</p>
            </section>
          ))}

          {caseItem.images?.length > 0 && <ImageGallery images={caseItem.images} />}
          {caseItem.videoType !== 'none' && caseItem.videoUrl && (
            <div className="mt-8">
              <VideoEmbed url={caseItem.videoUrl} type={caseItem.videoType} />
            </div>
          )}
        </div>
      </article>
    </>
  );
}
