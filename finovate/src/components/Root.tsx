import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./chatbot/Chatbot";

export default function Root() {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
			<Chatbot />
		</div>
	);
}
