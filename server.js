const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const profileRoutes = require("./Routes/Profile");
const contactRoutes = require("./Routes/Contact");
const connectRoutes = require("./Routes/connect");
const fileUploadRoutes = require("./Routes/FileUpload");
const filterRoutes = require("./Routes/Filter");
const storageRoutes = require("./Routes/storage");
const supportRoutes = require("./Routes/support");
const paymentRoutes = require("./Routes/Payment");
const requestRoutes = require("./Routes/request");
const ratingReviewRoutes = require("./Routes/RatingAndReviews");
const getCardsData = require("./Routes/GetData");
const projectLinksRoutes = require("./Routes/Projects");
const path = require("path");
require("./models/User");
require("./models/workerProfile");
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT_NO || 4000;
const dotenv = require("dotenv");
dotenv.config();
require("./pdfDetails");
require("./imageDetails");
require("./profileUpload");
const PdfSchema = mongoose.model("PdfDetails");
const ImageSchema = mongoose.model("ImageDetails");
const ProfileImageSchema = mongoose.model("ProfileImageDetails");
const { auth } = require("./middlewares/auth");
const multer = require("multer");

// database connection
database.connect();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// for viewing pdf files online
app.use("/api/v1/files", express.static(path.join(__dirname, "files")));
app.use("/profileImage", express.static(path.join(__dirname, "profileImage")));

// get a list of 4 service photo with their header and content

app.get("/api/services", (req, res) => {
  const servicesData = [
    {
      imageLink:
        "https://media.sketchfab.com/models/2a3a3ee10f4f4a0b9b5afb79ba74b86f/thumbnails/2872eb14c6214555be2f83a0fbc14db7/ca37b97d37c24b128f5c0109810b76e5.jpeg",
      serviceType: "Hire Worker and Contractors",
      link: "/worker",
      serviceContent:
        "Hire skilled workers or contractors for household or commercial needs, such as painters, plumbers, and electricians. Our verified professionals deliver top-quality service. Hire for fixed days or find interior specialists. Experience reliable, efficient, and expert craftsmanship for your project requirements with us.",
    },
    {
      imageLink:
        "https://img.freepik.com/premium-photo/3d-cartoon-illustration-engineer-engineering-background-factory_175994-57573.jpg",
      serviceType: "Hire Engineers",
      link: "/hireengineers",
      serviceContent:
        "Hire skilled engineers, including architects and civil engineers, for residential or commercial projects. Our verified professionals deliver quality and precision. From design and planning to construction supervision, our experts ensure efficient, timely project completion. Experience reliable, expert engineering solutions tailored to your specific needs",
    },
    {
      imageLink:
        "https://img.freepik.com/premium-photo/business-marketing-concept-3d-isometric-design-people-calculating-budget-making_870512-2457.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721347200&semt=ais_user",
      serviceType: "Hire Company",
      link: "/selectcompany",
      serviceContent:
        "Hire reputable companies for large construction projects, including commercial, residential, and infrastructure developments. Our experienced partners excel in managing and executing projects of all sizes. From planning and design to construction and finishing, they ensure quality, efficiency, and timely completion. Build confidently with our network",
    },
    {
      imageLink:
        "https://static.vecteezy.com/system/resources/thumbnails/040/251/715/small/ai-generated-3d-illustration-of-business-handshake-cute-cartoon-smiling-man-with-laptop-and-bearded-businessman-with-briefcase-standing-and-shaking-hands-successful-agreement-deal-concept-photo.jpg",
      serviceType: "Get Hired",
      link: "/selectcompany",
      serviceContent:
        "Get hired as a skilled worker or engineer in construction, plumbing, painting, and more. Join our network of professionals, including architects and electricians, offering top services for residential and commercial projects. Showcase your expertise, find opportunities, and connect with clients seeking reliable, verified workers.",
    },
  ];
  res.send(servicesData);
});

app.get("/api/explore-further", (req, res) => {
  const data = [
    {
      imageLink:
        "https://evolveindia.co/wp-content/uploads/2021/07/1_The-Wooden-Rhapsody-Modern-Bedroom-Interior-Design.jpg",
      heading: "Explore Designs",
      link: "/exploredesigns",
      content:
        "Discover a variety of design inspirations that help you create your dream space. Browse through our curated selection of styles and ideas.",
    },
    {
      imageLink:
        "https://svieducation.com/wp-content/uploads/2024/03/contact-us.webp",
      heading: "Post Your Requirement",
      link: "/postyourrequirements",
      content:
        "Share your project needs with us and get customized solutions. Our team is ready to assist you in bringing your vision to life.",
    },
    {
      imageLink:
        "https://img.freepik.com/free-vector/flat-design-join-us-message_23-2148954904.jpg",
      heading: "Join Us",
      link: "/joinus",
      content:
        "Become a part of our growing community and enjoy exclusive benefits. We welcome you to contribute and grow with us.",
    },
    {
      imageLink:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKtpJy-LddmAmBLKkQYQvPKoWvo1f440_Y1w&s",
      heading: "Terms And Conditions",
      link: "/t&c",
      content:
        "Understand the steps involved in our process to ensure a seamless experience. From consultation to completion, we've got you covered.",
    },
  ];
  res.send(data);
});

app.get("/api/interior-designs", (req, res) => {
  const interiorDesigns = [
    {
      name: "Modern Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOP_EFN19FcMimcpGf-V11a7jaqKJLPhgJtQ&s",
    },
    {
      name: "Scandinavian Living Room",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/hbx110123cortneybishop-009-6638f5a4a7c67.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*",
    },
    {
      name: "Art Deco Living Room",
      image:
        "https://cityfurnish.com/blog/wp-content/uploads/2023/07/modern-apartment-with-bold-bright-walls-perfect-showcasing-your-art-collection-min.jpg",
    },
    {
      name: "Nautical Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25IbApLAD-t6cqM8FL8jgA1_zGUnuGYqBZg&s",
    },
    {
      name: "Modern Farmhouse Kitchen",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "Minimalist Bedroom",
      image:
        "https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg",
    },
    {
      name: "Industrial Kitchen",
      image:
        "https://media.designcafe.com/wp-content/uploads/2023/07/05195443/modern-interior-design.jpg",
    },
    {
      name: "Traditional Dining Room",
      image:
        "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2021/06/10131120/interior-wall-design.jpg",
    },
    {
      name: "Bohemian Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnyIVqkmuuA1H9mJ-mMvtupJsDRjcHsk39lA&s",
    },
    {
      name: "Rustic Bedroom",
      image:
        "https://dlifeinteriors.com/wp-content/uploads/2019/08/Living-Room-Design-Ideas-with-sofa-for-Homes-Modern-Apartment-1.jpg",
    },
    {
      name: "Coastal Bathroom",
      image:
        "https://assets.architecturaldigest.in/photos/63a460d78df6b9fdb924d650/4:3/w_1440,h_1080,c_limit/4%20interior%20design%20trends%20you%20will%20see%20everywhere%20in%202023.jpg",
    },
    {
      name: "Farmhouse Kitchen",
      image:
        "https://www.sbid.org/wp-content/uploads/2022/04/spacejoy-4xRP0Ajk9ys-unsplash-e1655133373712.jpg",
    },
    {
      name: "Eclectic Living Room",
      image:
        "https://www.andacademy.com/resources/wp-content/uploads/2023/12/feature-20.webp",
    },
    {
      name: "Contemporary Office",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Mid-Century Modern Bedroom",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Vintage Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4dANhVkeQAN5l3AsvPXghfL59NFUM2J2dw&s",
    },
    {
      name: "Glam Dining Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Art Deco Living Room",
      image:
        "https://cityfurnish.com/blog/wp-content/uploads/2023/07/modern-apartment-with-bold-bright-walls-perfect-showcasing-your-art-collection-min.jpg",
    },
    {
      name: "Nautical Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25IbApLAD-t6cqM8FL8jgA1_zGUnuGYqBZg&s",
    },
    {
      name: "Modern Farmhouse Kitchen",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "Asian-Inspired Living Room",
      image:
        "https://www.swamiinterior.in/wp-content/uploads/2022/12/mira-road-interior-design-firm.webp",
    },
    {
      name: "Hollywood Regency Bedroom",
      image:
        "https://lacobuilders.com/wp-content/uploads/2022/05/Top-Interior-Design.jpg",
    },
    {
      name: "Tuscan Dining Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "French Country Kitchen",
      image:
        "https://bonito.in/wp-content/uploads/2022/02/Blog-Detail-01-1.jpg",
    },
    {
      name: "Shabby Chic Living Room",
      image:
        "https://dlifeinteriors.com/wp-content/uploads/2019/08/Living-Room-Design-Ideas-with-sofa-for-Homes-Modern-Apartment-1.jpg",
    },
    {
      name: "Urban Loft Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Tropical Bathroom",
      image:
        "https://www.sbid.org/wp-content/uploads/2022/04/spacejoy-4xRP0Ajk9ys-unsplash-e1655133373712.jpg",
    },
    {
      name: "Mediterranean Living Room",
      image:
        "https://www.assureshift.in/sites/default/files/images/content-images/north-indian-living-room-interior-1.jpg",
    },
    {
      name: "Moroccan Bedroom",
      image:
        "https://assets.architecturaldigest.in/photos/63a460d78df6b9fdb924d650/4:3/w_1440,h_1080,c_limit/4%20interior%20design%20trends%20you%20will%20see%20everywhere%20in%202023.jpg",
    },
    {
      name: "Zen Bathroom",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Southwestern Living Room",
      image:
        "https://www.nobroker.in/blog/wp-content/uploads/2024/03/creative-small-office-interior-design.jpg",
    },
    {
      name: "Boho Chic Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Beach House Living Room",
      image:
        "https://cityfurnish.com/blog/wp-content/uploads/2023/07/modern-apartment-with-bold-bright-walls-perfect-showcasing-your-art-collection-min.jpg",
    },
    {
      name: "Rustic Industrial Kitchen",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "Gothic Living Room",
      image:
        "https://assets.architecturaldigest.in/photos/63a460d78df6b9fdb924d650/4:3/w_1440,h_1080,c_limit/4%20interior%20design%20trends%20you%20will%20see%20everywhere%20in%202023.jpg",
    },
    {
      name: "English Country Dining Room",
      image:
        "https://lacobuilders.com/wp-content/uploads/2022/05/Top-Interior-Design.jpg",
    },
    {
      name: "Spanish Colonial Bedroom",
      image:
        "https://www.andacademy.com/resources/wp-content/uploads/2023/12/feature-20.webp",
    },
    {
      name: "Scandinavian Bathroom",
      image:
        "https://www.swamiinterior.in/wp-content/uploads/2022/12/mira-road-interior-design-firm.webp",
    },
    {
      name: "Modern Rustic Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Eclectic Bedroom",
      image:
        "https://www.sbid.org/wp-content/uploads/2022/04/spacejoy-4xRP0Ajk9ys-unsplash-e1655133373712.jpg",
    },
    {
      name: "Modern Office",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25IbApLAD-t6cqM8FL8jgA1_zGUnuGYqBZg&s",
    },
    {
      name: "Victorian Living Room",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Contemporary Bedroom",
      image:
        "https://www.nobroker.in/blog/wp-content/uploads/2024/03/creative-small-office-interior-design.jpg",
    },
    {
      name: "Classic Kitchen",
      image:
        "https://dlifeinteriors.com/wp-content/uploads/2019/08/Living-Room-Design-Ideas-with-sofa-for-Homes-Modern-Apartment-1.jpg",
    },
    {
      name: "Mediterranean Bathroom",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "French Provincial Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4dANhVkeQAN5l3AsvPXghfL59NFUM2J2dw&s",
    },
    {
      name: "Minimalist Office",
      image:
        "https://bonito.in/wp-content/uploads/2022/02/Blog-Detail-01-1.jpg",
    },
    {
      name: "Rustic Dining Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Modern Bathroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_GCWGA7mhb1XpsOIAI5yVqVjOmPKxM4VgNO2haUnsiaLlDfz53KTPcS7DusVsRpEhrD4&usqp=CAU",
    },
    {
      name: "Industrial Living Room",
      image:
        "https://goodhomes.wwmindia.com/content/2022/apr/all-gre-living-room-design-by-aparna-kaushik.jpg",
    },
    {
      name: "Scandinavian Kitchen",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Bohemian Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25IbApLAD-t6cqM8FL8jgA1_zGUnuGYqBZg&s",
    },
    {
      name: "Eclectic Bathroom",
      image:
        "https://www.andacademy.com/resources/wp-content/uploads/2023/12/feature-20.webp",
    },
    {
      name: "Coastal Living Room",
      image:
        "https://www.swamiinterior.in/wp-content/uploads/2022/12/mira-road-interior-design-firm.webp",
    },
    {
      name: "Farmhouse Bedroom",
      image:
        "https://assets.architecturaldigest.in/photos/63a460d78df6b9fdb924d650/4:3/w_1440,h_1080,c_limit/4%20interior%20design%20trends%20you%20will%20see%20everywhere%20in%202023.jpg",
    },
    {
      name: "Modern Dining Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Traditional Kitchen",
      image:
        "https://lacobuilders.com/wp-content/uploads/2022/05/Top-Interior-Design.jpg",
    },
    {
      name: "Minimalist Living Room",
      image:
        "https://cityfurnish.com/blog/wp-content/uploads/2023/07/modern-apartment-with-bold-bright-walls-perfect-showcasing-your-art-collection-min.jpg",
    },
    {
      name: "Industrial Bedroom",
      image:
        "https://www.assureshift.in/sites/default/files/images/content-images/north-indian-living-room-interior-1.jpg",
    },
    {
      name: "Scandinavian Dining Room",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "Bohemian Bathroom",
      image:
        "https://www.sbid.org/wp-content/uploads/2022/04/spacejoy-4xRP0Ajk9ys-unsplash-e1655133373712.jpg",
    },
    {
      name: "Rustic Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Coastal Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Farmhouse Dining Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_GCWGA7mhb1XpsOIAI5yVqVjOmPKxM4VgNO2haUnsiaLlDfz53KTPcS7DusVsRpEhrD4&usqp=CAU",
    },
    {
      name: "Modern Kitchen",
      image:
        "https://assets.architecturaldigest.in/photos/63a460d78df6b9fdb924d650/4:3/w_1440,h_1080,c_limit/4%20interior%20design%20trends%20you%20will%20see%20everywhere%20in%202023.jpg",
    },
    {
      name: "Traditional Bathroom",
      image:
        "https://lacobuilders.com/wp-content/uploads/2022/05/Top-Interior-Design.jpg",
    },
    {
      name: "Minimalist Bedroom",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Industrial Dining Room",
      image:
        "https://www.nobroker.in/blog/wp-content/uploads/2024/03/creative-small-office-interior-design.jpg",
    },
    {
      name: "Scandinavian Living Room",
      image:
        "https://dlifeinteriors.com/wp-content/uploads/2019/08/Living-Room-Design-Ideas-with-sofa-for-Homes-Modern-Apartment-1.jpg",
    },
    {
      name: "Bohemian Kitchen",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Rustic Bathroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Coastal Living Room",
      image:
        "https://www.swamiinterior.in/wp-content/uploads/2022/12/mira-road-interior-design-firm.webp",
    },
    {
      name: "Farmhouse Bedroom",
      image:
        "https://www.sbid.org/wp-content/uploads/2022/04/spacejoy-4xRP0Ajk9ys-unsplash-e1655133373712.jpg",
    },
    {
      name: "Modern Bathroom",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "Traditional Living Room",
      image:
        "https://www.andacademy.com/resources/wp-content/uploads/2023/12/feature-20.webp",
    },
    {
      name: "Minimalist Dining Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4dANhVkeQAN5l3AsvPXghfL59NFUM2J2dw&s",
    },
    {
      name: "Industrial Bathroom",
      image:
        "https://assets.architecturaldigest.in/photos/63a460d78df6b9fdb924d650/4:3/w_1440,h_1080,c_limit/4%20interior%20design%20trends%20you%20will%20see%20everywhere%20in%202023.jpg",
    },
    {
      name: "Scandinavian Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Bohemian Living Room",
      image:
        "https://cityfurnish.com/blog/wp-content/uploads/2023/07/modern-apartment-with-bold-bright-walls-perfect-showcasing-your-art-collection-min.jpg",
    },
    {
      name: "Rustic Kitchen",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25IbApLAD-t6cqM8FL8jgA1_zGUnuGYqBZg&s",
    },
    {
      name: "Coastal Dining Room",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Farmhouse Living Room",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "Modern Bedroom",
      image:
        "https://www.sbid.org/wp-content/uploads/2022/04/spacejoy-4xRP0Ajk9ys-unsplash-e1655133373712.jpg",
    },
    {
      name: "Traditional Dining Room",
      image:
        "https://www.nobroker.in/blog/wp-content/uploads/2024/03/creative-small-office-interior-design.jpg",
    },
    {
      name: "Minimalist Bathroom",
      image:
        "https://www.swamiinterior.in/wp-content/uploads/2022/12/mira-road-interior-design-firm.webp",
    },
    {
      name: "Industrial Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_GCWGA7mhb1XpsOIAI5yVqVjOmPKxM4VgNO2haUnsiaLlDfz53KTPcS7DusVsRpEhrD4&usqp=CAU",
    },
    {
      name: "Scandinavian Kitchen",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Bohemian Bedroom",
      image:
        "https://dlifeinteriors.com/wp-content/uploads/2019/08/Living-Room-Design-Ideas-with-sofa-for-Homes-Modern-Apartment-1.jpg",
    },
    {
      name: "Rustic Dining Room",
      image:
        "https://lacobuilders.com/wp-content/uploads/2022/05/Top-Interior-Design.jpg",
    },
    {
      name: "Coastal Bathroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Farmhouse Kitchen",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25IbApLAD-t6cqM8FL8jgA1_zGUnuGYqBZg&s",
    },
    {
      name: "Modern Living Room",
      image:
        "https://www.andacademy.com/resources/wp-content/uploads/2023/12/feature-20.webp",
    },
    {
      name: "Traditional Bedroom",
      image:
        "https://www.nobroker.in/blog/wp-content/uploads/2024/03/creative-small-office-interior-design.jpg",
    },
    {
      name: "Minimalist Kitchen",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Industrial Dining Room",
      image:
        "https://cityfurnish.com/blog/wp-content/uploads/2023/07/modern-apartment-with-bold-bright-walls-perfect-showcasing-your-art-collection-min.jpg",
    },
    {
      name: "Scandinavian Bathroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Bohemian Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_GCWGA7mhb1XpsOIAI5yVqVjOmPKxM4VgNO2haUnsiaLlDfz53KTPcS7DusVsRpEhrD4&usqp=CAU",
    },
    {
      name: "Rustic Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjzVj2OG7oU8K72QUdpBABuQRG7NMzZEw9w&s",
    },
    {
      name: "Coastal Kitchen",
      image:
        "https://decorious.com/public/services/August2021/interior-design.jpg",
    },
    {
      name: "Farmhouse Bathroom",
      image:
        "https://www.andacademy.com/resources/wp-content/uploads/2023/12/feature-20.webp",
    },
    {
      name: "Modern Dining Room",
      image:
        "https://interiordesign.net/wp-content/uploads/2024/07/Interior-Design1-Best-of-Year-2023-Steven-Harris-Architects-Rees-Roberts-Partners-idx231201_boy_BeachHouseL04-1024x683-1.jpg",
    },
    {
      name: "Traditional Living Room",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4dANhVkeQAN5l3AsvPXghfL59NFUM2J2dw&s",
    },
    {
      name: "Minimalist Bedroom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbHS7pJGX0Q-DQG9RE_A8TVWGQE2umfeAjg&s",
    },
    {
      name: "Industrial Kitchen",
      image:
        "https://dlifeinteriors.com/wp-content/uploads/2019/08/Living-Room-Design-Ideas-with-sofa-for-Homes-Modern-Apartment-1.jpg",
    },
  ];
  res.send(interiorDesigns);
});

// for pdf files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// uploading pdf files in local sever

app.post(
  "/api/v1/upload-files",
  auth,
  upload.single("file"),
  async (req, res) => {
    const Custom_id = req.user.id;
    console.log("yahi hai kya custom id", Custom_id);

    const { title } = req.body;
    const file = req.file;

    console.log("backend title", title);
    console.log("backend file", file);

    if (!file) {
      return res.status(400).json({ status: "No file uploaded" });
    }

    try {
      const uploadedFile = await PdfSchema.create({
        _id: Custom_id,
        title: title,
        pdf: req.file.filename,
      });
      console.log("hop gaya kya", uploadedFile);
      res.send({ status: "ok", file: file.filename });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ status: "error", error: error.message });
    }
  }
);

// uploading pdf files to mongoose database

app.get("/api/v1/get-files", async (req, res) => {
  try {
    const { id } = req.query;

    const findPdfName = await PdfSchema.findById(id).exec();
    if (!findPdfName) {
      return res.status(404).json({
        success: false,
        message: "No Such id found",
      });
    }

    console.log("this is your pdf data", findPdfName);

    return res.status(200).json({
      success: true,
      message: "FInally founded",
      data: findPdfName,
    });

    // PdfSchema.findById(id).then((data) => {
    //   res.send({ status: "ok", data: data });
    // });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// for images upload

const istorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const iupload = multer({ storage: istorage });

// uploading Image files to local server

app.post("/api/v1/upload-image", iupload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log("ye le dekh multer", req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const imageName = req.file.filename;

  try {
    const uploadedImage = await ImageSchema.create({ image: imageName });
    console.log("Image saved:", uploadedImage);
    res.status(200).json({ status: "ok", data: uploadedImage });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// uploading images to online mongoose database

app.get("/get-images", async (req, res) => {
  try {
    ImageSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// for profile image upload

const pstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./profileImage");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const pupload = multer({ storage: pstorage });

//uploading profile images to database

app.post(
  "/api/v1/upload-profile-image",
  auth,
  pupload.single("image"),
  async (req, res) => {
    console.log(req.body);
    console.log("ye le dekh multer", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageName = req.file.filename;
    const user_id = req.user.id;

    console.log("ye hai user id ", user_id);

    try {
      const uploadedImage = await ProfileImageSchema.create({
        _id: user_id,
        image: imageName,
      });
      console.log("Image saved:", uploadedImage);
      res.status(200).json({ status: "ok", data: uploadedImage });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ status: "error", error: error.message });
    }
  }
);

// uploading profile images to online mongoose database
app.get("/api/v1/get-profile-image", async (req, res) => {
  try {
    ProfileImageSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// cloudinary connection
cloudinaryConnect();

app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactRoutes);
// app.use("/api/v1/files", fileUploadRoutes);
app.use("/api/v1/filters", filterRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/ratings", ratingReviewRoutes);
app.use("/api/v1/connect", connectRoutes);
app.use("/api/v1/storage", storageRoutes);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/cardData", getCardsData);
app.use("/api/v1/projectLinks", projectLinksRoutes);
app.use("/api/v1/requestRoutes", requestRoutes);

//def route

// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and running",
//   });
// });

app.listen(PORT, () => {
  console.log(`App is running at port number ${PORT}`);
});
