import NavigationCard from "./NavigationCard";

export default function Layout({children,hideNavigation}) {
  let rightColumnClasses = '';
  if (hideNavigation) {
    rightColumnClasses += 'w-full';
  } else {
    rightColumnClasses += 'w-full';
  }
  return (
    <div className="md:flex mt-4 max-w-4xl mx-auto  mb-1 md:mb-0">
      {!hideNavigation && (
        <div className="fixed md:static w-full bottom-0 md:w-3/12 -mb-5">
          <NavigationCard />
        </div>
      )}
      <div className={rightColumnClasses}>
        {children}
      </div>
    </div>
  );
}