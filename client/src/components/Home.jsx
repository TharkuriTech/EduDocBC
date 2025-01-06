import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

// Static banner image URL
const bannerImage =
  "https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg";

const HomePage = () => {
  const handleLogin = () => {
    console.log("Redirecting to login...");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>

      <AppBar position="static" style={{ backgroundColor: "#00509E" }}>
        <Toolbar>
          {/* Logo and Title */}
          <Box style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/tharkuri-tech.appspot.com/o/Tharkuri%20Tech%2Flogo%2FTT_Banner.jpg?alt=media&token=69cb66d9-1f9e-4493-8f56-c120c82dbf06" // Replace with the actual logo file path
              alt="Tharkuri Tech Logo"
              style={{
                height: "60px",
                marginRight: "10px",
              }}
            />
          </Box>

          {/* Navigation Links */}
          <Box style={{ display: "flex", gap: "20px" }}>
            <Button
              color="inherit"
              style={{ color: "#fff" }}
              onClick={() => scrollToSection("about")}
            >
              About Us
            </Button>
            <Button
              color="inherit"
              style={{ color: "#fff" }}
              onClick={() => scrollToSection("features")}
            >
              Key Features
            </Button>
            <Button
              color="inherit"
              style={{ color: "#fff" }}
              onClick={() => scrollToSection("team")}
            >
              Teams
            </Button>
          </Box>

          {/* Login Button */}
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#00509E",
              marginLeft: "20px",
              border: "1px solid #00509E",
              borderRadius: "20px",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Banner Section */}
     

      <Box
      style={{
        position: "relative",
        height: "400px",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
          zIndex: 1,
        }}
      ></Box>

      {/* Content */}
      <Box
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" style={{ fontWeight: "bold" }}>
          Welcome to EduDocBC
        </Typography>
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Empowering Universities with Blockchain Innovation
        </Typography>
      </Box>
    </Box>
      {/* About Section */}
      <Container
        id="about"
        style={{ marginTop: "50px", textAlign: "center", padding: "20px" }}
      >
        <Typography
          variant="h4"
          style={{ color: "#00509E", marginBottom: "20px" }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "#333", lineHeight: "1.8", marginBottom: "30px" }}
        >
          Welcome to <strong>Tharkuri Tech</strong>, where innovation meets
          education. We specialize in leveraging cutting-edge{" "}
          <strong>blockchain technology</strong> to revolutionize the way
          universities issue and verify academic credentials. Our solutions
          ensure that certificates are
          <strong>secure, verifiable, and immutable</strong>, eliminating fraud
          and simplifying the verification process.
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "#333", lineHeight: "1.8", marginBottom: "30px" }}
        >
          At the heart of our mission is a commitment to empower educational
          institutions with modern tools to enhance trust and transparency. By
          partnering with universities, we aim to build a robust ecosystem where
          students, educators, and employers can seamlessly collaborate with
          confidence in the authenticity of academic records.
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "#333", lineHeight: "1.8", marginBottom: "30px" }}
        >
          With a team of passionate professionals and blockchain experts,
          Tharkuri Tech is dedicated to transforming traditional systems into
          smarter, more efficient processes. Whether you're an administrator
          looking for a streamlined way to issue certificates or a student who
          wants to showcase verified achievements, we’re here to provide the
          solutions you need.
        </Typography>
      </Container>

      {/* Features Section */}
      <Container id="features" style={{ padding: "20px" }}>
        <Typography
          variant="h4"
          style={{
            color: "#00509E",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              style={{
                border: "1px solid #E1E8ED",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{ color: "#00509E", marginBottom: "15px" }}
                >
                  Immutable Records
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#333", lineHeight: "1.8" }}
                >
                  All certificates issued on our blockchain are tamper-proof,
                  ensuring authenticity and security. Once recorded, your
                  credentials remain immutable and trusted forever.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              style={{
                border: "1px solid #E1E8ED",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{ color: "#00509E", marginBottom: "15px" }}
                >
                  Real-Time Verification
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#333", lineHeight: "1.8" }}
                >
                  Employers, institutions, and students can instantly verify
                  academic records with no third-party involvement, saving time
                  and reducing bureaucracy.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              style={{
                border: "1px solid #E1E8ED",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{ color: "#00509E", marginBottom: "15px" }}
                >
                  Easy Integration
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#333", lineHeight: "1.8" }}
                >
                  Our solutions seamlessly integrate with existing university
                  systems, ensuring a hassle-free transition to blockchain
                  without disrupting operations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

         
        </Grid>
      </Container>

     
      {/* Team Section */}
      <Container style={{ marginTop: "50px", textAlign: "center" }} id="team">
        <Typography variant="h4" style={{ color: "#00509E" }} gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              name: "Prakash K",
              role: "CEO",
              image:
                "https://firebasestorage.googleapis.com/v0/b/tharkuri-tech.appspot.com/o/Tharkuri%20Tech%2FTeams%2FTT0.jpg?alt=media&token=54c63dda-1be9-45a8-af15-153a7d242980",
            },
            {
              name: "Sirancheevi P",
              role: "CTO",
              image:
                "https://firebasestorage.googleapis.com/v0/b/tharkuri-tech.appspot.com/o/Tharkuri%20Tech%2FTeams%2FTT1.jpeg?alt=media&token=27087a98-5d47-44d1-8020-201c37cb9103",
            },
            {
              name: "Akash R",
              role: "CFO",
              image:
                "https://firebasestorage.googleapis.com/v0/b/tharkuri-tech.appspot.com/o/Tharkuri%20Tech%2FTeams%2FTT2.jpeg?alt=media&token=d8da05b8-1b3c-4959-a022-641060df92b3",
            },
          ].map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                style={{
                  border: "1px solid #E1E8ED",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                {/* Ensure the image is circular */}
                <CardMedia
                  component="img"
                  alt={member.name}
                  image={member.image}
                  style={{
                    width: "100px", // Set a specific size
                    height: "100px", // Match width for a square
                    objectFit: "cover", // Crop to cover the area
                    borderRadius: "50%", // Make it circular
                    margin: "20px auto 0", // Center the image
                  }}
                />
                <CardContent>
                  <Typography variant="h6" style={{ color: "#00509E" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                  <Box mt={2}>
                    <Button size="small" color="primary">
                      <LinkedInIcon />
                    </Button>
                    <Button size="small" color="primary">
                      <EmailIcon />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box
        style={{
          backgroundColor: "#003366",
          color: "#fff",
          marginTop: "50px",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          © 2024 Tharkuri Tech. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
