export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(" mm 220 - - -  dashboard layout  ");

  return (
    <section>
      <div className="w-[100%] h-lvh bg-amber-200 flex justify-center place-items-center">
        {/* <Template key={11}>{children}</Template> */}
        {children}
      </div>
    </section>
  );
}
