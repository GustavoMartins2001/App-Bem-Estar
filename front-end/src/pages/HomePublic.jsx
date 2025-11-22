import {frameSteps, motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Target, ChartNoAxesCombined, Sprout, HeartHandshake, CalendarHeart, MessageSquareHeart, House, Leaf} from "lucide-react";
import Navbar from "../components/Navbar";

export default function HomePublic() {
    const navigate = useNavigate();

    return (
        <div className="flex-col min-h-screen">
         <Navbar />
        
        {/* hero section */}
        <motion.div
            initial={{ opacity: 0, y: 30}}
            animate={{ opacity: 1, y: 0}}
            transition={{ duration: 0.8 }}
        >
        <div className="text-center py-10 pt-20">
            <div className="flex flex-col items-center justify-center">
            <motion.div
                animate={{
                    y: [0, -8, 0],
                    rotate: [0, -5, 5, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Leaf className="w-12 h-12 text-[#71ab59] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"/>
            </motion.div>
            <h1 className="text-7xl font-extrabold mb-6 text-shadow">Bem-Estar</h1>
            <p className="text-2xl max-w-2xl font-semibold">
                Você em primeiro lugar sempre acompanhe, entenda e cuide de si mesmo todos os dias!
            </p>
            </div>
        </div>
        </motion.div>

        {/* cards explicativos */}
        <motion.section
            className="grid md:grid-cols-3 gap-8 px-10 md:px-24 py-14 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="bg-slate-100 rounded-3xl shadow-md p-8 hover:-translate-y-1 hover:shadow-lg transition">
                <Target className="mx-auto text-[#e37739] w-10 h-10 mb-4"/>
                <h2 className="text-2xl font-bold mb-4">Acompanhe Metas</h2>
                <p>Registre metas de curto e longo prazo e acompanhe seu progresso!</p>
            </div>

            <div className="bg-slate-100 rounded-3xl shadow-md p-8 hover:-translate-y-1 hover:shadow-lg transition">
                <ChartNoAxesCombined className="mx-auto text-[#5781bd] w-10 h-10 mb-4"/>
                <h2 className="text-2xl font-bold mb-4">Monitore diariamente</h2>
                <p>Veja gráficos e análises sobre seu humor e bem-estar a cada dia.</p>
            </div>

            <div className="bg-slate-100 rounded-3xl shadow-md p-8 hover:-translate-y-1 hover:shadow-lg transition">
                <Sprout className="mx-auto text-[#71ab59] w-10 h-10 mb-4"/>
                <h2 className="text-2xl font-bold mb-4">Comece Hoje!</h2>
                <p>Faça seu cadastro e dê o primeiro passo para seu autocuidado!</p>
                <a href="/register" className="brilho bg-destaqueAcao text-white font-semibold px-10 py-1 rounded-2xl mt-4 inline-block"
                >Cadastre-se</a>
            </div>

        </motion.section>

        {/* banner quem somos */}
        <motion.section
            className="bg-destaqueAcao -mx-36 rounded-2xl py-20 px-8 text-white mb-16 transition"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-center md:text-left gap-10">
            <div className="flex-1">
                <House className="mx-auto md:mx-56 text-white w-12 h-12 mb-4" />
                <h2 className="text-5xl font-extrabold mb-6">Quem Somos Nós?</h2>
                <p className="text-xl leading-relaxed font-medium">
                    Nós somos um grupo dedicado a ajudar você a se conhecer melhor, monitorando
                    seu bem-estar mental e te trazendo motivação para realizar suas metas pessoais!
                    Nosso principal objetivo é promover autoconhecimento e equilíbrio no seu dia a dia. 🥰
                </p>
            </div>
            <motion.img
                src="/charlie-brown.png"
                alt="Charlie Brown"
                className="w-80 md:w-[400px] flex-shrink-0 drop-shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
            />
        </div>
        </motion.section>

        {/* recursos rápidos */}
        <motion.section
            className="py-20 md:px-24 bg-slate-100 rounded-3xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <h2 className="text-5xl font-extrabold text-center mb-12 text-shadow">Precisa de apoio?</h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-[#fff3ec] rounded-3xl shadow-md p-8 hover:-translate-y-1 hover:bg-[#ffdcb9] transition-all duration-300">
                    <HeartHandshake className="mx-auto text-[#ff7708] w-10 h-10 mb-4"/>
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Vittude</h3>
                        <p className="mb-4">Encontre profissionais online e agende sua consulta com praticidade!</p>
                    </div>
                    <a
                        href="https://www.vittude.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brilho px-6 py-2 rounded-full bg-[#ff7708] text-white font-semibold"
                    >Acessar site</a>
                </div>

                <div className="bg-[#fffbf0] rounded-3xl shadow-md p-8 hover:-translate-y-1 hover:bg-[#ffebb3] transition-all duration-300">
                    <CalendarHeart className="mx-auto text-[#F2AF08] w-10 h-10 mb-4"/>
                    <div>
                        <h3 className="text-2xl font-bold mb-3">PsyMeet</h3>
                        <p className="mb-4">Consultas com psicólogos e terapeutas por um preço social acessível para todos!</p>
                    </div>
                    <a
                        href="https://www.psymeetsocial.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brilho px-6 py-2 rounded-full bg-[#F2AF08] text-white font-semibold"
                    >Acessar site</a>
                </div>

                <div className="bg-[#efe5ff] rounded-3xl shadow-md p-8 hover:-translate-y-1 hover:bg-[#dec7ff] transition-all duration-300">
                    <MessageSquareHeart className="mx-auto text-[#6E25D4] w-10 h-10 mb-4"/>
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Zenklub</h3>
                        <p className="mb-4">Programas de bem-estar e saúde mental para empresas e colaboradores.</p>
                    </div>
                    <a
                        href="https://zenklub.com.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brilho px-6 py-2 rounded-full bg-[#6E25D4] text-white font-semibold"
                    >Acessar site</a>
                </div>
            </div>

        </motion.section>
        </div>
    )
}