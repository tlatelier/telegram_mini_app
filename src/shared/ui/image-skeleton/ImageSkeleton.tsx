import './image-skeleton.less';

type ImageSkeletonProps = {
    className?: string;
    aspectRatio?: string;
};

const ImageSkeleton = ({ className = '', aspectRatio }: ImageSkeletonProps) => {
    return (
        <div
            className={`imageSkeleton ${className}`}
            style={aspectRatio ? { aspectRatio } : undefined}
        >
            <div className="imageSkeleton__shimmer" />
        </div>
    );
};

export {
    ImageSkeleton,
};
