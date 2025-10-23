export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md bg-white text-black p-8 rounded-2xl shadow-xl border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>
        <hr className="border-gray-300 mb-6" />

        <div className="flex flex-col items-center justify-center bg-gray-100 text-black p-6 rounded-lg shadow-md w-full">
          <p className="text-xl font-semibold mb-2">User ID</p>
          <span className="text-2xl font-mono bg-black text-white px-4 py-2 rounded-lg">
            {params.id}
          </span>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Welcome to your profile! You can add more details here like username, email, and activity stats.
          </p>
        </div>
      </div>
    </div>
  );
}
