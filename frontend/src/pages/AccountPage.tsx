import LayoutWrapper from "@/components/layout-wrapper"

export default function AccountPage() {
  return (
    <LayoutWrapper>
      <div className="h-full flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">My Account</h2>
        <p className="text-center mb-6">Manage your account settings, preferences, and subscription details.</p>
        <div className="w-full max-w-md space-y-4">
          <div className="p-4 border border-orange-200 rounded-lg">
            <h3 className="font-medium mb-2">Profile Settings</h3>
            <p className="text-sm text-gray-500">Update your personal information</p>
          </div>
          <div className="p-4 border border-orange-200 rounded-lg">
            <h3 className="font-medium mb-2">Subscription</h3>
            <p className="text-sm text-gray-500">Manage your subscription plan</p>
          </div>
          <div className="p-4 border border-orange-200 rounded-lg">
            <h3 className="font-medium mb-2">Security</h3>
            <p className="text-sm text-gray-500">Password and security settings</p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
