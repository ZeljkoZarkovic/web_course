const questions = [
    {
        //INTERNET i WWW
        question: "Ko je razvio prvu računarsku mrežu ARPANET?",
        type: "choice",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Advanced Research Projects Agency (ARPA)", correct: true },
            { text: "IBM", correct: false },
            { text: "Apple", correct: false },
        ]
    },
    {
        question: "Koji je protokol namenjen za prenos web datoteka preko Interneta?",
        type: "choice",
        answers: [
            { text: "FTP", correct: false },
            { text: "XML", correct: false },
            { text: "HTTP", correct: true },
            { text: "TCP", correct: false },
        ]
    },
    {
        question: "Koje od navedenih organizacija su povezane sa standardizacijom Interneta? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "W3C", correct: true },
            { text: "IETF", correct: true },
            { text: "NASA", correct: false },
            { text: "ICANN", correct: true },
        ]
    },
    {
        question: "Koje od sledećih tvrdnji se odnose na Connection-Oriented protokole? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Zahtevaju uspostavljanje logičke veze pre slanja podataka", correct: true },
            { text: "Ne zahtevaju uspostavljanje veze", correct: false },
            { text: "Primeri su TCP i FTP", correct: true },
            { text: "Koriste se isključivo za broadcast prenos", correct: false },
        ]
    },
    {
        question: "TCP/IP mrežni model sastoji se od četiri sloja koji se mogu mapirati na OSI slojeve.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "Hub prosleđuje pakete samo računaru kome su namenjeni.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "Šta omogućava web programerima kreiranje interaktivnih sajtova koji funkcionišu slično desktop programima, za razliku od klasičnih sajtova, gde se nakon svake promene učitava cela stranica?",
        type: "text",
        keywords: ["AJAX"],
        correctAnswer: "AJAX"
    },
    {
        //HTML5 i CSS3
        question: "Koja od sledećih tvrdnji najbolje opisuje XHTML?",
        type: "choice",
        answers: [
            { text: "XHTML je verzija CSS-a koja definiše izgled stranice.", correct: false },
            { text: "XHTML je verzija HTML-a usklađena sa XML standardom.", correct: true },
            { text: "XHTML je programski jezik za bazu podataka.", correct: false },
            { text: "XHTML je grafički alat za kreiranje web stranica.", correct: false },
        ]
    },
    {
        question: "Koja naredba se koristi da bi se deklarisala verzija HTML-a u dokumentu?",
        type: "choice",
        answers: [
            { text: "<!DOCTYPE>", correct: true },
            { text: "<html>", correct: false },
            { text: "<header>", correct: false },
            { text: "<version>", correct: false },
        ]
    },
    {
        question: "Koji od sledećih elementi su novi u HTML5? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "<article>", correct: true },
            { text: "<section>", correct: true },
            { text: "<nav>", correct: true },
            { text: "<frameset>", correct: false },
        ]
    },
    {
        question: "Koje su od sledećih tehnologija deo HTML5 API-ja? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "DNS Lookup", correct: false },
            { text: "Web Storage", correct: true },
            { text: "Geolocation", correct: true },
            { text: "Canvas", correct: true },
        ]
    },
    {
        question: "U XHTML-u svi elementi moraju imati početni i završni tag.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "HTML5 zahteva dodatne plug-in programe za reprodukciju video sadržaja.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {

        question: "Definisati p tag, podesiti boju teksta da bude plava i poziciju teksta na sredini?",
        type: "text",
        keywords: ["p", "style", "color", "blue", "text-align", "align", "center"],
        correctAnswer: "<p style=&quot;color: blue; text-align: center;&quot;>WEB</p>"
    },
    {
        //JavaScript
        question: "Koja od sledećih tvrdnji najbolje opisuje JavaScript?",
        type: "choice",
        answers: [
            { text: "JavaScript je programski jezik koji se izvršava na serveru.", correct: false },
            { text: "JavaScript je skript jezik koji se izvršava na strani klijenta u okviru web pretraživača.", correct: true },
            { text: "JavaScript je sistemski jezik namenjen za programiranje operativnih sistema.", correct: false },
            { text: "JavaScript je jezik za izradu baza podataka.", correct: false },
        ]
    },
    {
        question: "Šta predstavlja Document Object Model (DOM)?",
        type: "choice",
        answers: [
            { text: "Algoritam za kompresiju podataka.", correct: false },
            { text: "Grafički editor za dizajn web stranica.", correct: false },
            { text: "Interfejs koji omogućava pristup i manipulaciju HTML dokumentima pomoću JavaScript-a.", correct: true },
            { text: "Skup alata za testiranje JavaScript koda.", correct: false },
        ]
    },
    {
        question: "Koje od sledećih tvrdnji se odnose na jQuery biblioteku? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Omogućava jednostavno rukovanje događajima, efektima i animacijama.", correct: true },
            { text: "Namenjena je isključivo za server-side skriptovanje.", correct: false },
            { text: "Pruža lakšu manipulaciju DOM elementima.", correct: true },
            { text: "Besplatna je i otvorenog koda.", correct: true },
        ]
    },
    {
        question: "Koje su od sledećih tehnologija JavaScript okviri (frameworks)? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Angular", correct: true },
            { text: "React", correct: true },
            { text: "Backbone", correct: true },
            { text: "MySQL", correct: false },
        ]
    },
    {
        question: "JavaScript kod se uvek mora nalaziti u okviru <body> taga.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "Bootstrap koristi mrežni sistem baziran na Flexbox tehnologiji.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "Kako bi selektovali sledeći tag u JavaScript-u: &lt;div class=&quot;test&quot;&gt; ?",
        type: "text",
        keywords: ["document", "getElementsByClassName", "className", "test"],
        correctAnswer: "document.getElementsByClassName(\"test\")"

    },
    {
        //XML
        question: "Šta predstavlja XML (Extensible Markup Language)?",
        type: "choice",
        answers: [
            { text: "Jezik za izradu web stranica sa unapred definisanim tagovima.", correct: false },
            { text: "Programska biblioteka za obradu podataka.", correct: false },
            { text: "Standardni, otvoreni format za opis i razmenu podataka na Web-u.", correct: true },
            { text: "Baza podataka za čuvanje vektorskih zapisa.", correct: false },
        ]
    },
    {
        question: "Koja XML tehnologija se koristi za definisanje strukture XML dokumenata?",
        type: "choice",
        answers: [
            { text: "XSLT", correct: false },
            { text: "DTD / XSD", correct: true },
            { text: "XPath", correct: false },
            { text: "SOAP", correct: false },
        ]
    },
    {
        question: "Koje tehnologije su zasnovane na XML-u? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "SOAP", correct: true },
            { text: "WSDL", correct: true },
            { text: "JSON", correct: false },
            { text: "SAML", correct: true },
        ]
    },
    {
        question: "Koje od sledećih tvrdnji važe za REST web servise? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Koriste HTTP metode kao što su GET, POST, PUT, DELETE", correct: true },
            { text: "Zavisni su od konekcije (stateful)", correct: false },
            { text: "Prenose podatke u XML ili JSON formatu", correct: true },
            { text: "Izlažu resurse putem URI adresa", correct: true },
        ]
    },
    {
        question: "XML parser je program koji čita i obrađuje XML dokumente i formira hijerarhijsku strukturu podataka.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "XML je zamena za HTML i koristi se umesto njega za prikaz web stranica.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "Šta su AUTORIZACIJA i INTEGRITET?",
        type: "text",
        keywords: ["autorizacija", "kontrola pristupa", "integritet", "onemogućavanje izmena"],
        correctAnswer: "Autorizacija je kontrola pristupa, integritet je onemogućavanje izmena."
    },
    {
        //WEB dizajn
        question: "Šta predstavlja frontend deo web razvoja?",
        type: "choice",
        answers: [
            { text: "Serversku logiku i obradu podataka", correct: false },
            { text: "Dizajn i funkcionalnost interfejsa u pregledaču", correct: true },
            { text: "Upravljanje bazom podataka", correct: false },
            { text: "Sistem za autentifikaciju korisnika", correct: false },
        ]
    },
    {
        question: "Koji od sledećih jezika se najčešće koristi na backend strani web aplikacija?",
        type: "choice",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "HTML", correct: false },
            { text: "PHP", correct: true },
            { text: "CSS", correct: false },
        ]
    },
    {
        question: "Koji su glavni koraci u planiranju web sajta? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Određivanje ciljeva sajta", correct: true },
            { text: "Analiza auditorijuma", correct: true },
            { text: "Testiranje brzine sajta", correct: false },
            { text: "Mapiranje postojećeg sajta", correct: true },
        ]
    },
    {
        question: "Koje su osnovne faze web projekta? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Faza planiranja", correct: true },
            { text: "Faza testiranja", correct: true },
            { text: "Faza dizajna", correct: true },
            { text: "Faza proizvodnje hardvera", correct: false },
        ]
    },
    {
        question: "Korisnički zahtevi se odnose na funkcionalnost servera i kompatibilnost sa bazom podataka.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "Jednostavnost i konzistentnost su ključni principi dobrog web dizajna.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "Koje vrste zahteva postoje?",
        type: "text",
        keywords: ["poslovni", "tehnički", "korisnički", "dizajnerski", "zahtevi"],
        correctAnswer: "Poslovni zahtevi, tehnički zahtevi, korisnički zahtevi, dizajnerski zahtevi"
    },
    {
        //SEO
        question: "Koja je osnovna svrha SEO optimizacije?",
        type: "choice",
        answers: [
            { text: "Da učini sajt vizuelno privlačnijim korisnicima", correct: false },
            { text: "Da poveća brzinu učitavanja sajta", correct: false },
            { text: "Da poboljša vidljivost i rangiranje sajta u rezultatima pretraživača", correct: true },
            { text: "Da spreči pretraživače da indeksiraju sadržaj", correct: false },
        ]
    },
    {
        question: "Koja je razlika između organskih i PPC rezultata na stranici pretrage?",
        type: "choice",
        answers: [
            { text: "Organski su plaćeni, a PPC besplatni", correct: false },
            { text: "Organski su rezultat indeksiranja pretraživača, a PPC su plaćeni oglasi", correct: true },
            { text: "Organski se pojavljuju samo na društvenim mrežama", correct: false },
            { text: "PPC rezultati se odnose na slike i video sadržaje", correct: false },
        ]
    },
    {
        question: "Koje su osnovne faze SEO procesa? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Istraživanje", correct: true },
            { text: "Optimizacija", correct: true },
            { text: "Analiza rezultata", correct: true },
            { text: "Hosting sajta", correct: false },
        ]
    },
    {
        question: "Koje su karakteristike White Hat SEO pristupa? (izaberi sve tačne odgovore)",
        type: "multiple",
        answers: [
            { text: "Korišćenje skrivenog teksta", correct: false },
            { text: "Optimalna upotreba ključnih reči", correct: true },
            { text: "Kvalitetan sadržaj", correct: true },
            { text: "Cloaking tehnike", correct: false },
        ]
    },
    {
        question: "“Black Hat” SEO tehnike uključuju skrivanje ključnih reči i manipulaciju sadržajem da bi se prevario pretraživač.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "Pretraživači mogu da „vide“ slike, pa nije potrebno koristiti &lt;alt&gt; atribute.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "Koja je jedna od najvažnijih oznaka koja mora da se koristi za SEO?",
        type: "text",
        keywords: ["anchor tag", "tag", "a"],
        correctAnswer: "Anchor tag <a>"
    },
];