export const TabBar: React.FC = () => {
  return (
    <div className="bg-slate-600 sticky bottom-0 w-full h-12 px-4 flex items-center justify-end drop-shadow-[0_-3px_3px_rgba(0,0,0,0.50)]">
      <div className="flex gap-1  items-end">
        <p className="text-base font-semibold">Total: R$13,50</p>
        <div>
          <span className="text-xs">1/item</span>
        </div>
      </div>
    </div>
  );
};
