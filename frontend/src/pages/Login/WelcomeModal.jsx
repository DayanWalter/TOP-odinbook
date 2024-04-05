export default function WelcomeModal() {
  return (
    <>
      <div className="border flex max-w-screen-sm flex-col rounded p-5 bg-gray-100 ">
        <h1 className="text-2xl text-center pb-5 mb-5 border-b">Welcome!</h1>
        <p>After you've clicked "Demo User Login"</p>
        <p>it takes about 60 seconds for the server to start.</p>
        <p>
          If you are not logged in after 60 seconds, please reload this site and
          try again.
        </p>
        <p>Thank you for visting BitFeather :)</p>
      </div>
    </>
  );
}
