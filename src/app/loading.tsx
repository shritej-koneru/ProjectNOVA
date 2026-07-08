import { GooeyLoader } from '@/components/ui/loader-10';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <GooeyLoader />
    </div>
  );
}
