export default function HomePage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1
          className="
          text-4xl font-bold text-amber-900
          border-l-4 border-amber-400
          pl-4 mb-12
          bg-gradient-to-r from-amber-200 to-transparent
          py-3 rounded-r-lg
          animate-pulse
        "
        >
          Welcome to Warehouse
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="
            bg-white p-6 rounded-xl
            shadow-lg hover:shadow-xl
            transition-all duration-300
            border border-amber-200
          "
          >
            <h2
              className="
              text-2xl font-semibold text-amber-900
              mb-4 pb-2
              border-b-2 border-amber-200
            "
            >
              Company News
            </h2>
            <p
              className="
              text-amber-800 leading-relaxed
              text-justify
            "
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio non ullam labore
              consequatur aspernatur modi placeat veniam optio iste aliquam magnam odit aliquid nam,
              a veritatis officia? Perferendis autem eaque maiores, accusantium, veniam cumque quis
              iusto beatae quaerat suscipit quod consectetur voluptate nulla possimus.
            </p>
          </div>

          <div
            className="
            bg-white p-6 rounded-xl
            shadow-lg hover:shadow-xl
            transition-all duration-300
            border border-amber-200
          "
          >
            <h2
              className="
              text-2xl font-semibold text-amber-900
              mb-4 pb-2
              border-b-2 border-amber-200
            "
            >
              Latest Updates
            </h2>
            <p
              className="
              text-amber-800 leading-relaxed
              text-justify
            "
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio non ullam labore
              consequatur aspernatur modi placeat veniam optio iste aliquam magnam odit aliquid nam,
              a veritatis officia? Perferendis autem eaque maiores, accusantium, veniam cumque quis
              iusto beatae quaerat suscipit quod consectetur voluptate nulla possimus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
