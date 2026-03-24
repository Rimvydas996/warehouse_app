import { useEffect, useMemo, useState } from 'react';
import warehouseImage from '../assets/warehouse.webp';
import { HomeHeader, HomeImageCard, HomeInfoCard } from '../components/features';
import { LoadingIndicator } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { apiGetCurrentWarehouse } from '../services/api/warehouseManagementApi';
import type { IHomeContainer } from '../types/models/IWarehouse';

export default function HomePage() {
    const { user, isReady, isAuthenticated } = useAuth();
    const [containers, setContainers] = useState<IHomeContainer[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isReady) return;
        if (!isAuthenticated) {
            setContainers([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        if (!user?.activeWarehouseId) {
            setContainers([]);
            setIsLoading(false);
            return;
        }
        apiGetCurrentWarehouse()
            .then((overview) => {
                setContainers(overview?.warehouse?.homeContainers ?? []);
            })
            .catch((err) => {
                console.error('Failed to load home containers:', err);
                setContainers([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isReady, isAuthenticated, user?.activeWarehouseId]);

    const infoCards = useMemo(() => {
        if (isAuthenticated) {
            return containers.map((container) => ({
                key: container._id,
                title: container.title,
                description: container.description,
                tasks: container.tasks,
            }));
        }
        if (containers.length > 0) {
            return containers.map((container) => ({
                key: container._id,
                title: container.title,
                description: container.description,
                tasks: container.tasks,
            }));
        }
        return [
            {
                key: 'company-news',
                title: 'Company News',
                description:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio non ullam labore consequatur aspernatur modi placeat veniam optio iste aliquam magnam odit aliquid nam, a veritatis officia? Perferendis autem eaque maiores, accusantium, veniam cumque quis iusto beatae quaerat suscipit quod consectetur voluptate nulla possimus.',
                tasks: '',
            },
            {
                key: 'latest-updates',
                title: 'Latest Updates',
                description:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio non ullam labore consequatur aspernatur modi placeat veniam optio iste aliquam magnam odit aliquid nam, a veritatis officia? Perferendis autem eaque maiores, accusantium, veniam cumque quis iusto beatae quaerat suscipit quod consectetur voluptate nulla possimus.',
                tasks: '',
            },
        ];
    }, [containers, isAuthenticated]);

    return (
        <div className='min-h-screen py-8 px-4'>
            <div className='max-w-5xl mx-auto'>
                <HomeHeader title='Welcome to Warehouse' />

                <div className='grid gap-8 md:grid-cols-2'>
                    {!isAuthenticated && <HomeImageCard imageSrc={warehouseImage} altText='Warehouse' />}
                    {isAuthenticated && isLoading ? (
                        <div className='theme-card theme-card-elevated p-6 flex justify-center'>
                            <LoadingIndicator label='Loading homepage content...' />
                        </div>
                    ) : (
                        infoCards.map((card) => (
                            <HomeInfoCard
                                key={card.key}
                                title={card.title}
                                description={card.description}
                                tasks={card.tasks}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
