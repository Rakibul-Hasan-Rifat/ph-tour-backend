import bcrypt from "bcryptjs";
import User from "../modules/user/user.model";
import environmentVariables from "../config/env.config";
import { IUser, Role } from "../modules/user/user.interface";

/* eslint-disable no-console */

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminAvailable = await User.findOne({
      email: environmentVariables.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminAvailable) {
      console.log("Super admin exists!");
      return;
    }

    console.log("Trying to create super admin 😎");

    const hashedPassword = await bcrypt.hash(
      environmentVariables.SUPER_ADMIN_PASSWORD,
      parseInt(environmentVariables.BCRYPT_SALT_ROUND)
    );

    const superAdminInfo: Partial<IUser> = {
      name: "Super Admin",
      email: environmentVariables.SUPER_ADMIN_EMAIL,
      role: Role.SUPER_ADMIN,
      password: hashedPassword,
      isVerified: true,
      auths: [
        {
          provider: "credentials",
          providerId: environmentVariables.SUPER_ADMIN_EMAIL,
        },
      ],
    };

    const superAdmin = await User.create(superAdminInfo);

    console.log("Super admin created successfully!", superAdmin);
    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
  }
};

export default seedSuperAdmin;
