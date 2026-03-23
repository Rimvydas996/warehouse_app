import warehouseImage from "../assets/warehouse.webp";
import { HomeHeader, HomeImageCard, HomeInfoCard } from "../components/features";

export default function HomePage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <HomeHeader title="Welcome to Warehouse" />

        <div className="grid gap-8 md:grid-cols-2">
          <HomeImageCard imageSrc={warehouseImage} altText="Warehouse" />
          <HomeInfoCard
            title="Company News"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio non ullam labore consequatur aspernatur modi placeat veniam optio iste aliquam magnam odit aliquid nam, a veritatis officia? Perferendis autem eaque maiores, accusantium, veniam cumque quis iusto beatae quaerat suscipit quod consectetur voluptate nulla possimus."
          />
          <HomeInfoCard
            title="Latest Updates"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio non ullam labore consequatur aspernatur modi placeat veniam optio iste aliquam magnam odit aliquid nam, a veritatis officia? Perferendis autem eaque maiores, accusantium, veniam cumque quis iusto beatae quaerat suscipit quod consectetur voluptate nulla possimus."
          />
        </div>
      </div>
    </div>
  );
}
