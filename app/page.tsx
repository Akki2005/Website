import Carousel from "./components/Carousel"
import CommunityMessages from "./components/CommunityMessages"
import NewsEvents from "./components/NewsEvents"
import WelcomeHero from "./components/WelcomeHero"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-home-background text-home-text">
      <WelcomeHero />
      <Carousel />
      <CommunityMessages />
      <NewsEvents />
    </div>
  )
}

