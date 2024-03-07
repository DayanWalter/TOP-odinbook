export default function Footer() {
  return (
    <footer className="flex flex-col items-center pt-2 pb-3 rounded-md">
      <h2 className="font-semibold text-xl text-gray-600 mb-0.5">BitFeather</h2>
      <p className="text-sm text-gray-500 mb-0.5">2024</p>
      <a
        href="https://github.com"
        className="outline-gray-500"
        target="_blank"
        rel="noreferrer"
        aria-label="View source code on Github"
      ></a>
    </footer>
  );
}
