import Header from './Header';

export default function MainSite({ children }) {
  return (
    <div className="bg-gray-100 ">
      <Header />
      <div className="pt-20 pb-20 sm:pt-24 ">{children}</div>
    </div>
  );
}
