import bcrypt from "bcryptjs";
import User from "../modules/user/user.model";
import environmentVariables from "../config/env.config";
import { IUser, Role } from "../modules/user/user.interface";

/* eslint-disable no-console */

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminAvailable = await User.findOne({
      email: environmentVariables.super_admin_email,
    });

    if (isSuperAdminAvailable) {
      console.log("Super admin exists!");
      return;
    }

    console.log("Trying to create super admin 😎");

    const hashedPassword = await bcrypt.hash(
      environmentVariables.super_admin_password,
      parseInt(environmentVariables.hash_salt)
    );

    const superAdminInfo: Partial<IUser> = {
      name: "Super Admin",
      email: environmentVariables.super_admin_email,
      role: Role.SUPER_ADMIN,
      password: hashedPassword,
      isVerified: true,
      auths: [
        {
          provider: "credentials",
          providerId: environmentVariables.super_admin_email,
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
