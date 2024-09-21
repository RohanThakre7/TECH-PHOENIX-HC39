const mongoose = require("mongoose");
const Domain = require("./models/Domain");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const domains = [
      {
        title: "Artificial Intelligence",
        details:
          "Artificial Intelligence (AI) involves creating systems that can perform tasks typically requiring human intelligence. This includes problem-solving, understanding language, and recognizing patterns, enabling machines to learn and adapt.",
        mentors: [],
      },
      {
        title: "Cybersecurity",
        details:
          "Cybersecurity focuses on protecting computers, networks, and data from unauthorized access, attacks, and damage. It encompasses practices such as encryption, firewalls, and intrusion detection to safeguard sensitive information.",
        mentors: [],
      },
      {
        title: "Data Science",
        details:
          "Data Science combines statistical analysis, machine learning, and data visualization to extract insights from structured and unstructured data. It plays a crucial role in decision-making across various industries.",
        mentors: [],
      },
      {
        title: "Machine Learning",
        details:
          "Machine Learning is a subset of AI that enables systems to learn from data without explicit programming. It uses algorithms to identify patterns and make predictions, transforming how businesses leverage data.",
        mentors: [],
      },
      {
        title: "Blockchain Technology",
        details:
          "Blockchain technology is a decentralized digital ledger that records transactions across many computers securely. Its transparency and security features make it fundamental for cryptocurrencies and various applications beyond finance.",
        mentors: [],
      },
      {
        title: "Cloud Computing",
        details:
          "Cloud Computing provides scalable computing resources over the internet, allowing businesses to access data and applications without physical hardware. This model enhances collaboration, flexibility, and cost-effectiveness.",
        mentors: [],
      },
      {
        title: "Internet of Things (IoT)",
        details:
          "The Internet of Things (IoT) refers to the interconnection of everyday devices to the internet, enabling them to collect and exchange data. IoT applications range from smart homes to industrial automation, enhancing efficiency and convenience.",
        mentors: [],
      },
      {
        title: "Augmented Reality (AR)",
        details:
          "Augmented Reality (AR) enhances the real world with digital information, improving user interaction and engagement. It finds applications in gaming, education, and training, providing immersive experiences.",
        mentors: [],
      },
      {
        title: "Virtual Reality (VR)",
        details:
          "Virtual Reality (VR) creates fully immersive digital environments that users can explore and interact with. This technology is widely used in gaming, simulations, and training, offering new ways to experience content.",
        mentors: [],
      },
      {
        title: "Quantum Computing",
        details:
          "Quantum Computing leverages the principles of quantum mechanics to process information at unprecedented speeds. This technology has the potential to solve complex problems that are currently infeasible for classical computers.",
        mentors: [],
      },
      {
        title: "DevOps",
        details:
          "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle. It emphasizes collaboration, automation, and continuous delivery to improve product quality and deployment speed.",
        mentors: [],
      },
      {
        title: "Mobile App Development",
        details:
          "Mobile App Development involves designing and creating applications for smartphones and tablets. It requires knowledge of mobile platforms and user experience design to deliver engaging and functional apps.",
        mentors: [],
      },
      {
        title: "Web Development",
        details:
          "Web Development encompasses the building and maintenance of websites and web applications. It involves both front-end (user interface) and back-end (server-side) development, ensuring seamless user experiences online.",
        mentors: [],
      },
      {
        title: "Digital Marketing",
        details:
          "Digital Marketing uses online channels to promote products and services. It includes techniques like SEO, social media marketing, and email campaigns, helping businesses reach and engage their target audience effectively.",
        mentors: [],
      },
      {
        title: "Game Development",
        details:
          "Game Development is the process of creating video games, involving various disciplines such as programming, art, and design. This field blends creativity and technology to produce engaging and interactive experiences.",
        mentors: [],
      },
    ];

    await Domain.insertMany(domains);
    console.log("Domains seeded");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
