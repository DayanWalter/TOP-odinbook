// Components
import Header from "../components/header/Header";

export default function MainPageContainer({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="px-5 pt-20 pb-20 sm:pt-24 ">{children}</div>
    </div>
  );
}
