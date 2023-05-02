import Card from "@/components/Card";
import Layout from "@/components/Layout";
import {getProviders, signIn, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function LoginPage({providers}) {
  const {data,status} = useSession();
  const router = useRouter();
  if (status === 'loading') {
    return '';
  }
  if (data) {
    router.push('/');
  }
  return (
    <Layout hideNavigation={true}>
       <div className="h-screen flex items-center">
        <div className="max-w-xs mx-auto grow -mt-24">
          <h1 className="text-6xl mb-4 text-gray-300 text-center">Login</h1>
    <Card noPadding={true}>
    <div className="">
            <div
                className=""
            >
                <div className="p-5 bg-white md:flex-1">
                    <form action="#" className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-500">Username</label>
                            <input
                                type="text"
                                id="Username"
                                placeholder="Username"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Senha</label>
                                <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">esqueceu a senha?</a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                placeholder="password"
                            />
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            <button
                                type="button"
                                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                onClick={() => signIn("credentials", {
                                    email: email.current, password: password.current,
                                })}
                            >
                                Registrar
                            </button>
                        </div>
                        <p className="flex ">ja tem conta? <Link href={'/login'}><div className="text-blue-700 ml-3">Entrar</div></Link></p>
                        <div className="flex flex-col space-y-5">
                            <span className="flex items-center justify-center space-x-2">
                                
                            </span>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
    </Card>
    </div>
    </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {providers},
  }
}