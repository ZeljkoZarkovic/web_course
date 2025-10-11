const stars = document.querySelectorAll(".star");
    let selectedRating = 0;

    stars.forEach(star => {
      star.addEventListener("click", () => {
        selectedRating = parseInt(star.dataset.value);
        stars.forEach(s => s.classList.remove("selected"));
        for (let i = 0; i < selectedRating; i++) {
          stars[i].classList.add("selected");
        }
      });
    });

    document.getElementById("posaljiBtn").addEventListener("click", () => {
      const ime = document.getElementById("imePrezime").value.trim();
      const smer = document.getElementById("smer").value.trim();
      const indeks = document.getElementById("brojIndeksa").value.trim();
      const komentar = document.getElementById("komentar").value.trim();

      if (!ime || !smer || !indeks || selectedRating === 0) {
        alert("Molimo popunite sva polja i izaberite ocenu.");
        return;
      }

      const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSd2-81EwNBTzi8_oh3KpIaKYa1y4pqxyHitRtXsX7ECZVxvAw/formResponse";

      const formData = new FormData();
      formData.append("entry.631473354", ime);
      formData.append("entry.984215715", smer);
      formData.append("entry.718940384", indeks);
      formData.append("entry.250486311", selectedRating);
      formData.append("entry.2024318847", komentar);

      fetch(formURL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      }).then(() => {
        showPopup();
        document.getElementById("imePrezime").value = "";
        document.getElementById("smer").value = "";
        document.getElementById("brojIndeksa").value = "";
        document.getElementById("komentar").value = "";
        stars.forEach(s => s.classList.remove("selected"));
        selectedRating = 0;
      }).catch((err) => {
        alert("Greška pri slanju, pokušajte ponovo.");
        console.error(err);
      });
    });

    function showPopup() {
      document.getElementById("popup").style.display = "flex";
    }

    function closePopup() {
      document.getElementById("popup").style.display = "none";
    }