import { useNavigate } from 'react-router-dom';
import Menu from '../Menu/Menu';
import WarehouseSwitcher from '../WarehouseSwitcher/WarehouseSwitcher';
import { useAuth } from '../../../context/AuthContext';
import useProductsPage from '../../../hooks/products/useProductsPage';

export default function NavigationBar(): JSX.Element {
    const navigate = useNavigate();
    const { user, isReady, updateUser } = useAuth();
    const { refillCount, hasWarehouse } = useProductsPage({ user, isReady, updateUser });

    return (
        <div
            className={`
      flex justify-between items-center p-4 w-full 
      bg-gradient-to-r from-amber-400 to-amber-300
      shadow-lg rounded-lg 
    `}
        >
            <h3
                onClick={() => navigate('/')}
                className='theme-link text-xl font-bold cursor-pointer transition-colors duration-200 px-4 h-10 rounded-lg flex items-center'
            >
                Warehouse
            </h3>
            {!hasWarehouse && user && (
                <button
                    type='button'
                    onClick={() => navigate('/warehouse/manage')}
                    className='theme-button px-3 h-10 rounded-lg transition-all duration-200 flex items-center'
                >
                    Manage Warehouse
                </button>
            )}
            <div className='flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto'>
                <div className='hidden lg:block'>
                    <WarehouseSwitcher />
                </div>
                {hasWarehouse && (
                    <div className='hidden lg:flex items-center gap-2'>
                        <button
                            type='button'
                            onClick={() => navigate('/products')}
                            className='theme-button px-3 h-10 rounded-lg transition-all duration-200 flex items-center'
                        >
                            Products
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/warehouse/manage')}
                            className='theme-button px-3 h-10 rounded-lg transition-all duration-200 flex items-center'
                        >
                            Manage Warehouse
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/warehouse/home-containers')}
                            className='theme-button px-3 h-10 rounded-lg transition-all duration-200 flex items-center'
                        >
                            Homepage Content
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/warehouse/refill-needed')}
                            className='theme-button px-3 h-10 rounded-lg transition-all duration-200 flex items-center'
                        >
                            <span className='inline-flex items-center gap-2'>
                                Refill Needed
                                {refillCount > 0 && (
                                    <span className='text-xs font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full'>
                                        {refillCount}
                                    </span>
                                )}
                            </span>
                        </button>
                    </div>
                )}
                <Menu />
            </div>
        </div>
    );
}
