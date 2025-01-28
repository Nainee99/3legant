import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AccountDetails() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">Account Details</h2>
      <form className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">FIRST NAME *</Label>
            <Input id="firstName" defaultValue="Sofia" required />
          </div>

          <div>
            <Label htmlFor="lastName">LAST NAME *</Label>
            <Input id="lastName" defaultValue="Havertz" required />
          </div>

          <div>
            <Label htmlFor="displayName">DISPLAY NAME *</Label>
            <Input id="displayName" defaultValue="Sofia Havertz" required />
            <p className="mt-1 text-sm text-gray-500">
              This will be how your name will be displayed in the account
              section and in reviews
            </p>
          </div>

          <div>
            <Label htmlFor="email">EMAIL *</Label>
            <Input
              id="email"
              type="email"
              defaultValue="sofia.havertz@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold pt-4">Password Change</h3>

          <div>
            <Label htmlFor="currentPassword">CURRENT PASSWORD</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <Label htmlFor="newPassword">NEW PASSWORD</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">CONFIRM NEW PASSWORD</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
