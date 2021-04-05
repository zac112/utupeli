class Translations{
	getLang(lang){
		
		var translations = {
		'ARMORY':{
			'fi':'Varustamo',
			'en':'Armory'
		},
		'ARMY':{
			'fi':'Armeija',
			'en':'Army'
		},		
		'BARRACKS':{
			'fi':'Kasarmi',
			'en':'Barracks'
		},
		'BUILDINGS':{
			'fi':'Rakennukset',
			'en':'Buildings'
		},		
		'BUY':{
			'fi':'Osta',
			'en':'Buy'
		},
		'CHECKEMAIL':{
			'fi':"Tarkista sähköpostisi rekisteröinnin loppuunviemistä ja kaupunkisi avainta varten.",
			'en':"Check your email for the verification code and the key to your city!"
		},
		'CREATE':{
			'fi':'Luo tunnus',
			'en':'Create account'
		},
		'CREATEINSTRUCTIONS':{
			'fi':'Kirjoita kenttään utu-shäköpostisi. Sähköpostiin lähetetään varmistuskoodi, joka pitää syöttää tänne. Tällä varmistetaan, että olet Turun yliopiston opiskelija ja että sinulla on pääsy kirjoittamaasi sähköpostiin. sähköpostiosoitteen tiiviste (SHA256) talletetaan pelin tietokantaan, jotta samaa sähköpostia ei voida käyttää usean kertaan.',
			'en':'Write your utu-email to the field below. You will receive a verification code, which must be input back here. This is to make sure you are a student at the Univeristy of Turku and have access to the email provided. A hash of the email (SHA256) will be stored to the game\'s database in oder to prevent multiple accounts with the same email.'
		},
		'ENTERUTUMAIL':{
			'fi':'Kirjoita utu-sähköpostisi:',
			'en':'Enter your utu-email:'
		},
		'FOOD':{
			'fi':'Ruoka',
			'en':'Food'
		},
		'FARM':{
			'fi':'Maatila',
			'en':'Farm'
		},
		'GOLD':{
			'fi':'Kulta',
			'en':'Gold'
		},
		'GOLDMINE':{
			'fi':'Kultakaivot',
			'en':'Gold mine'
		},
		'HOUSE':{
			'fi':'Talo',
			'en':'House'
		},
		'KNGIHT':{
			'fi':'Ritari',
			'en':'Knight'
		},
		'LIBRARY':{
			'fi':'Kirjasto',
			'en':'Library'
		},
		'LOGIN':{
			'fi':'Kirjaudu',
			'en':'Login'
		},
		'LOGINTEXT':{
			'fi':'Syötä kaupunkisi avain:',
			'en':'Enter the key to your city:'
		},
		'NEXTTURN':{
			'fi':'Seuraava vuoro',
			'en':'Next turn in'
		},
		'OK':{
			'fi':'OK',
			'en':'OK'
		},		
		'OVERVIEW':{
			'fi':'Yleiskatsaus',
			'en':'Overview'
		},		
		'POPULATION':{
			'fi':'Asukkaat',
			'en':'Population'
		},		
		'REGISTERLINK':{
			'fi':'Eikö sinulla ole vielä kaupunkia? Klikkaa tästä!',
			'en':'Don\'t have a city yet? Create one by clicking here!'
		},
		'SCOUT':{
			'fi':'Tiedustelija',
			'en':'Scout'
		},
		'SOLDIER':{
			'fi':'Sotilas',
			'en':'Soldier'
		},		
		'STABLES':{
			'fi':'Tallia',
			'en':'Stables'
		},
		'VERIFICATIONENTRY':{
			'fi':'Kirjoita saamasi varmistuskoodi:',
			'en':'Enter your verification code:'
		},
		'WARROOM':{
			'fi':'Kartta',
			'en':'War Room'
		}};		
	
	
		var res = {};
		Object.keys(translations).forEach(e => res[e]=translations[e][lang])
		return {'translations':res};		
	}
}

export default Translations;