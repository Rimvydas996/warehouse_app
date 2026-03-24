interface IProductDeleteButtonProps {
    isDeleting: boolean;
    isUpdating: boolean;
    onDelete: () => void;
}

export default function ProductDeleteButton({ isDeleting, isUpdating, onDelete }: IProductDeleteButtonProps) {
    return (
        <button
            type='button'
            onClick={onDelete}
            className='
        bg-red-100 px-3 py-1
        rounded-lg border border-red-200
        hover:bg-red-200 hover:shadow-md
        transition-all duration-200
        text-red-800
        w-full md:w-auto
        disabled:opacity-60 disabled:cursor-not-allowed
      '
            disabled={isDeleting || isUpdating}
            aria-label='Delete product'
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
