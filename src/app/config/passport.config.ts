import bcrypt from "bcryptjs";
import passport, { Profile } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";

import User from "../modules/user/user.model";
import environmentVariables from "./env.config";
import { Role } from "../modules/user/user.interface";


// passport local strategy setup
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email: string, password: string, done) => {
    
    try {
        if (!email) {
            done(null, false, {message: "Email is not provided!"})
        }

        const isUserAvailable = await User.findOne({email});

        if(!isUserAvailable) {
            return done(null, false, {message: "User not found!"})
        }

        const isGoogleAuthenticated = isUserAvailable.auths.some(auth => auth.provider === "google");

        if(isGoogleAuthenticated && !isUserAvailable.password) {
            done(null, false, {message: "You have registered with google. If you want to login with credentials, first login using google and set a password."})
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserAvailable.password as string);

        if(!isPasswordMatched) {
            return done(null, false, {message: "Credentials is wrong!"})
        }

        return done(null, isUserAvailable)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);        
        done(error);
    }
}))

// passport google strategy setup
passport.use(new GoogleStrategy({

    clientID: environmentVariables.GOOGLE_CLIENT_ID,
    clientSecret: environmentVariables.GOOGLE_CLIENT_SECRET,
    callbackURL: environmentVariables.GOOGLE_CALLBACK_URL

}, async(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
        const email = profile.emails?.[0].value;

        if(!email) {
            return done(null, false, {message: "No email found"});
        }

        let user = await User.findOne({email});

        if(!user) {
            user = await User.create({
                email,
                name: profile.displayName,
                pictrue: profile.photos?.[0].value,
                role: Role.USER,
                isVerified: true,
                auths: [
                    {
                        provider: "google",
                        providerId: profile.id
                    }
                ]
            })
        }

        return done(null, user as Express.User);

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Google Strategy Error", error);
        return done(error);
    }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) => {
    // eslint-disable-next-line no-console
    console.log('serializer', user)
  done(null, user._id);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: unknown, done: (err: any, user?: Express.User | false | null) => void) => {

    try {
        const user = await User.findById(id);
        done(null, user as Express.User);

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        done(error)
    }
});

// passport.use(new LocalStrategy())