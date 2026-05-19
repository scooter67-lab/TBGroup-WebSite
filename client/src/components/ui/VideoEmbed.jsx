export default function VideoEmbed({ url, type = 'youtube' }) {
  if (!url) return null;

  if (type === 'youtube') {
    const id = url.match(/(?:youtu\.be\/|v=)([^&]+)/)?.[1];
    if (!id) return null;
    return (
      <div className="aspect-video rounded-2xl overflow-hidden">
        <iframe
          title="Video"
          src={`https://www.youtube.com/embed/${id}`}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video src={url} controls className="w-full rounded-2xl" />
  );
}
