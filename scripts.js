// HeartDeal - Family Peace Contract
// Interactive enhancements for the contract website

document.addEventListener("DOMContentLoaded", function () {
  // Animate articles on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all articles
  const articles = document.querySelectorAll(".article");
  articles.forEach((article) => {
    article.style.opacity = "0";
    article.style.transform = "translateY(30px)";
    article.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(article);
  });

  // Add click effect to signature lines
  const signatureLines = document.querySelectorAll(".signature-line");
  signatureLines.forEach((line) => {
    line.addEventListener("click", function () {
      this.style.borderColor = "#ff6b9d";
      this.style.transform = "scale(1.05)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  });

  // Add floating animation to heart icon
  const heartIcon = document.querySelector(".heart-icon");
  if (heartIcon) {
    setInterval(() => {
      heartIcon.style.transform = "scale(1.1) rotate(5deg)";
      setTimeout(() => {
        heartIcon.style.transform = "scale(1) rotate(0deg)";
      }, 300);
    }, 3000);
  }

  // Add smooth hover effects to articles
  articles.forEach((article) => {
    article.addEventListener("mouseenter", function () {
      this.style.borderRightWidth = "8px";
    });

    article.addEventListener("mouseleave", function () {
      this.style.borderRightWidth = "5px";
    });
  });

  // Add ripple effect on article click
  articles.forEach((article) => {
    article.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.right;
      const y = e.clientY - rect.top;

      ripple.style.width = ripple.style.height = "20px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 107, 157, 0.3)";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.animation = "ripple 0.6s ease-out";
      ripple.style.pointerEvents = "none";

      this.style.position = "relative";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(10);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Add date counter for 90-day trial period
  const contractDate = new Date("2025-11-04T20:00:00");
  const endDate = new Date(contractDate);
  endDate.setDate(endDate.getDate() + 90);

  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      // Add countdown display if it doesn't exist
      let countdownEl = document.getElementById("countdown");
      if (!countdownEl) {
        countdownEl = document.createElement("div");
        countdownEl.id = "countdown";
        countdownEl.style.cssText = `
                    text-align: center;
                    padding: 20px;
                    margin: 20px 0;
                    background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(248, 181, 0, 0.1));
                    border-radius: 15px;
                    border: 2px dashed #ff6b9d;
                    font-size: 1.1em;
                    color: #c44569;
                `;
        const article4 = document.querySelector('.article[data-number="4"]');
        if (article4) {
          article4.appendChild(countdownEl);
        }
      }

      countdownEl.innerHTML = `
                <strong>⏱️ זמן נותר לתקופת המבחן:</strong><br>
                ${days} ימים, ${hours} שעות, ${minutes} דקות
            `;
    } else {
      const countdownEl = document.getElementById("countdown");
      if (countdownEl) {
        countdownEl.innerHTML = `
                    <strong>✅ תקופת המבחן הסתיימה</strong><br>
                    הגיע הזמן למפגש הערכה משותף
                `;
        countdownEl.style.background =
          "linear-gradient(135deg, rgba(46, 213, 115, 0.1), rgba(0, 184, 148, 0.1))";
        countdownEl.style.borderColor = "#2ed573";
      }
    }
  }

  // Update countdown every minute
  updateCountdown();
  setInterval(updateCountdown, 60000);

  // Add print functionality
  window.addEventListener("beforeprint", function () {
    document.body.style.background = "white";
  });

  window.addEventListener("afterprint", function () {
    document.body.style.background = "";
  });

  // Add keyboard shortcut for print (Ctrl+P / Cmd+P)
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "p") {
      e.preventDefault();
      window.print();
    }
  });

  console.log("❤️ HeartDeal Contract loaded successfully");
  console.log("Made with love for AnLoMinus");
});
