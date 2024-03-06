import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			async authorize(credentials, req) {
				const { email, password } = credentials;

				const user = await User.findOne({ email });
				if (!user) {
					return null;
				}

				const pwdMatch = await bcrypt.compare(password, user.password);
				if (!pwdMatch) {
					return null;
				}

				if (user && pwdMatch) {
					console.log("All good, returning user");
					return user;
				} else {
					return null;
				}
			},
			async session({ session }) {
				const user = await User.findOne({
					email: session?.user?.email,
				});
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/auth/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
