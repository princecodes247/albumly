export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">User Settings</h1>
      <form className="mt-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  )
} 