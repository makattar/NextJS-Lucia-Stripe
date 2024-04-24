import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ISignUpCardProp {
  widthClass: string;
  heightClass: string;
}

export default function SignUpCard({
  widthClass,
  heightClass,
}: Readonly<ISignUpCardProp>) {
  return (
    <Card className={`${widthClass} ${heightClass}`}>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Get Onboarded Now!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <Input
                id="confirmpassword"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Log In</Button>
        <Button>Sign Up</Button>
      </CardFooter>
    </Card>
  );
}
