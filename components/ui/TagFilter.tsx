'use client';

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        data-active={activeTag === null}
        className="tag-pill text-xs px-4 py-2 rounded-sm tracking-wider uppercase"
        style={{ letterSpacing: '0.08em' }}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(tag)}
          data-active={activeTag === tag}
          className="tag-pill text-xs px-4 py-2 rounded-sm tracking-wider uppercase"
          style={{ letterSpacing: '0.08em' }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
