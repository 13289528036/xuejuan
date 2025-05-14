export default function ExerciseCard({ title, description, imageUrl, link, tags }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group">
        {imageUrl && (
          <div className="relative w-full h-48"> {/* Fixed height for image container */}
            <image
              src={imageUrl}
              alt={title || 'Exercise image'}
              layout="fill"
              objectFit="cover" // Ensures image covers the area
              className="transition-transform duration-300 group-hover:scale-105" // Optional: zoom image on card hover
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-600 text-sm mb-4 h-20 overflow-y-auto">{description}</p> {/* Fixed height for description */}
          {tags && tags.length > 0 && (
            <div className="mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded-md
                         transform transition-transform duration-200 ease-in-out hover:bg-sky-600 hover:scale-105 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            >
              查看练习
            </a>
          ) : (
            <span className="text-sm text-slate-400">暂无链接</span>
          )}
        </div>
      </div>
    );
  }