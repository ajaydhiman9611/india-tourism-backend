const mongoose = require('mongoose')
const connectMongoDB = require("../utility/connectDB");
require("../models/places")
require("../models/states")
const Place = mongoose.model('Place')
const State = mongoose.model('State')


connectMongoDB()
mongoose.connection.on('error', function (err) {
  console.trace('MongoDb Connection Error ' + err)
  console.log('Shutting Down the User Trace')
  console.log('User Session Terminated')
  process.exit(0)
})
mongoose.connection.on('connected', function () {
  console.log('\nConnected to mongodb!')
  // uploadStates().then(res => 
    main()
  // ).catch(err => console.log(err))  
})

let placesData = [
  {
    "name": "Darjeeling Himalayan Railway (Toy Train)",
    "desc": "A UNESCO World Heritage site, this narrow-gauge railway runs through the scenic hills of Darjeeling, West Bengal.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.2667, 27.0500]
    }
  },
  {
    "name": "Victoria Memorial",
    "desc": "A grand marble building in Kolkata, West Bengal, built in memory of Queen Victoria, now a museum showcasing colonial history.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.3428, 22.5447]
    }
  },
  {
    "name": "Howrah Bridge",
    "desc": "An iconic cantilever bridge over the Hooghly River in Kolkata, West Bengal, one of the busiest in the world.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.3483, 22.5869]
    }
  },
  {
    "name": "Sundarbans National Park",
    "desc": "A UNESCO World Heritage site and a vast mangrove forest in the Ganges delta, West Bengal, famous for its Royal Bengal tigers.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.8333, 22.0000]
    }
  },
  {
    "name": "Kalimpong",
    "desc": "A serene hill station in West Bengal, known for its monasteries, orchid nurseries, and panoramic views of the Himalayas.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.4700, 27.0600]
    }
  },
  {
    "name": "Shantiniketan",
    "desc": "A town in West Bengal associated with Rabindranath Tagore and the Visva-Bharati University, a center for art and culture.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [87.6800, 23.6800]
    }
  },
  {
    "name": "Belur Math",
    "desc": "The headquarters of the Ramakrishna Math and Ramakrishna Mission, located on the west bank of the Hooghly River in West Bengal.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.3578, 22.6389]
    }
  },
  {
    "name": "Jaldapara National Park",
    "desc": "A national park in West Bengal known for its population of the Indian one-horned rhinoceros.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [89.3000, 26.7000]
    }
  },
  {
    "name": "Marble Palace",
    "desc": "A palatial mansion in North Kolkata, West Bengal, known for its neoclassical architecture and art collections.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.3500, 22.6000]
    }
  },
  {
    "name": "Dakshineswar Kali Temple",
    "desc": "A Hindu temple complex located on the eastern bank of the Hooghly River in West Bengal, dedicated to Goddess Kali.",
    "state": "West Bengal",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.3567, 22.6650]
    }
  },
  {
    "name": "Mysore Palace",
    "desc": "A magnificent palace in Mysore, Karnataka, the official residence of the Wadiyar dynasty and a stunning example of Indo-Saracenic architecture.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.6500, 12.3000]
    }
  },
  {
    "name": "Hampi",
    "desc": "A UNESCO World Heritage site in Karnataka, the ruins of the ancient city of Vijayanagara, featuring remarkable temples and monuments.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.4600, 15.3400]
    }
  },
  {
    "name": "Bangalore (Bengaluru)",
    "desc": "The capital city of Karnataka, known as the 'Silicon Valley of India', offering a blend of modern urban life and historical sites like Bangalore Palace and Tipu Sultan's Summer Palace.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    }
  },
  {
    "name": "Coorg (Kodagu)",
    "desc": "A popular hill station in Karnataka known for its coffee plantations, lush green hills, and pleasant climate.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.7000, 12.4200]
    }
  },
  {
    "name": "Jog Falls",
    "desc": "The second-highest plunge waterfall in India, located in Karnataka, a spectacular natural wonder.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.8167, 14.2333]
    }
  },
  {
    "name": "Gokarna",
    "desc": "A coastal town in Karnataka known for its beautiful beaches, temples, and laid-back atmosphere.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.3186, 14.5325]
    }
  },
  {
    "name": "Badami Cave Temples",
    "desc": "A complex of four rock-cut cave temples in Badami, Karnataka, showcasing Chalukya architecture.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.6700, 15.9100]
    }
  },
  {
    "name": "Aihole",
    "desc": "A historical site in Karnataka with numerous Chalukya-era temples and monuments.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.7000, 16.0200]
    }
  },
  {
    "name": "Pattadakal",
    "desc": "A UNESCO World Heritage site in Karnataka, featuring a group of impressive 7th and 8th-century temples.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.8700, 15.9600]
    }
  },
  {
    "name": "Srirangapatna",
    "desc": "A historical town in Karnataka, once the capital of Tipu Sultan, with significant forts and temples.",
    "state": "Karnataka",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.7200, 12.4200]
    }
  },
  {
    "name": "Goa Beaches (various)",
    "desc": "Goa is famous for its numerous beaches, each with its unique charm, from the lively Baga and Calangute to the serene Palolem and Agonda.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.8333, 15.5000]
    }
  },
  {
    "name": "Old Goa Churches",
    "desc": "A UNESCO World Heritage site featuring magnificent churches built during the Portuguese colonial era, such as the Basilica of Bom Jesus and the Sé Catedral.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.9000, 15.5000]
    }
  },
  {
    "name": "Dudhsagar Falls",
    "desc": "A stunning four-tiered waterfall located on the Mandovi River in Goa, known for its milky white appearance.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.3167, 15.3167]
    }
  },
  {
    "name": "Fort Aguada",
    "desc": "A well-preserved 17th-century Portuguese fort overlooking the Arabian Sea in North Goa, offering panoramic views.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.7667, 15.4917]
    }
  },
  {
    "name": "Spice Plantations",
    "desc": "Goa's hinterlands are home to lush spice plantations where you can learn about and experience the cultivation of various spices.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.1000, 15.3000]
    }
  },
  {
    "name": "Anjuna Flea Market",
    "desc": "A popular Wednesday flea market in Anjuna, Goa, known for its eclectic mix of goods, from handicrafts to clothing.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.7333, 15.5667]
    }
  },
  {
    "name": "Calangute Beach",
    "desc": "One of the most famous and busiest beaches in North Goa, known for its water sports and vibrant nightlife.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.7600, 15.5400]
    }
  },
  {
    "name": "Baga Beach",
    "desc": "Another popular beach in North Goa, adjacent to Calangute, known for its shacks, nightlife, and water sports.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.7500, 15.5500]
    }
  },
  {
    "name": "Mandaravi River Cruise",
    "desc": "Enjoy scenic boat cruises on the Mandaravi River in Goa, often including cultural performances and sunset views.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.8333, 15.5000]
    }
  },
  {
    "name": "Casino Royale Goa",
    "desc": "One of the popular offshore casinos in Goa, offering a range of gaming and entertainment options.",
    "state": "Goa",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.8167, 15.4917]
    }
  },
  {
    "name": "Jaipur City Palace",
    "desc": "A complex of courtyards, gardens, and buildings in Jaipur, Rajasthan, showcasing a blend of Rajasthani and Mughal architecture.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.8225, 26.9239]
    }
  },
  {
    "name": "Hawa Mahal (Palace of Winds)",
    "desc": "A distinctive pink sandstone palace in Jaipur, Rajasthan, with a facade of 953 small windows.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.8267, 26.9250]
    }
  },
  {
    "name": "Amber Fort (Amer Fort)",
    "desc": "A majestic fort located on a hill near Jaipur, Rajasthan, known for its artistic Hindu elements.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.8514, 26.9850]
    }
  },
  {
    "name": "Jantar Mantar (Jaipur)",
    "desc": "An astronomical observatory built in the early 18th century by Maharaja Jai Singh II in Jaipur, Rajasthan.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.8228, 26.9247]
    }
  },
  {
    "name": "Jal Mahal (Water Palace)",
    "desc": "A palace located in the middle of Man Sagar Lake in Jaipur, Rajasthan.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.8375, 26.9528]
    }
  },
  {
    "name": "Umaid Bhawan Palace",
    "desc": "A grand palace in Jodhpur, Rajasthan, part of which is still the residence of the former royal family, while the rest is a luxury hotel and museum.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.0236, 26.2964]
    }
  },
  {
    "name": "Mehrangarh Fort",
    "desc": "A formidable fort situated on a high hill in Jodhpur, Rajasthan, offering stunning views of the city.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.0159, 26.2989]
    }
  },
  {
    "name": "Lake Pichola",
    "desc": "A picturesque artificial lake in Udaipur, Rajasthan, featuring island palaces like Jag Mandir and Lake Palace.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.6800, 24.5700]
    }
  },
  {
    "name": "City Palace, Udaipur",
    "desc": "A magnificent palace complex in Udaipur, Rajasthan, overlooking Lake Pichola.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.6817, 24.5789]
    }
  },
  {
    "name": "Jaisalmer Fort (Golden Fort)",
    "desc": "A living fort in Jaisalmer, Rajasthan, with shops, homes, and hotels within its walls.",
    "state": "Rajasthan",
    "coordinates": {
      "type": "Point",
      "coordinates": [70.9125, 26.9153]
    }
  },
  {
    "name": "Golden Temple (Harmandir Sahib)",
    "desc": "The holiest Gurdwara of Sikhism, located in Amritsar, Punjab. Known for its stunning golden architecture and spiritual significance.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.8765, 31.6195]
    }
  },
  {
    "name": "Jallianwala Bagh",
    "desc": "A historic garden in Amritsar, Punjab, significant for the Jallianwala Bagh massacre that took place here in 1919.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.8730, 31.6234]
    }
  },
  {
    "name": "Wagah Border",
    "desc": "The border crossing ceremony between India and Pakistan, held daily near Amritsar, Punjab. A vibrant display of patriotism and military tradition.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.5900, 31.6000]
    }
  },
  {
    "name": "Rock Garden of Chandigarh",
    "desc": "A unique sculpture garden in Chandigarh, created by Nek Chand using industrial and urban waste.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.7800, 30.7400]
    }
  },
  {
    "name": "Sukhna Lake",
    "desc": "A scenic reservoir at the foothills of the Shivalik Hills in Chandigarh, offering boating and recreational activities.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.8000, 30.7400]
    }
  },
  {
    "name": "Qila Mubarak",
    "desc": "A historical fort in Bathinda, Punjab, with significant architectural and historical importance.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.9456, 30.2147]
    }
  },
  {
    "name": "Anandpur Sahib",
    "desc": "A city in Punjab, significant in Sikhism as the birthplace of the Khalsa.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.5167, 31.2333]
    }
  },
  {
    "name": "Chattbir Zoo (Mahendra Chaudhary Zoological Park)",
    "desc": "A zoological park located near Zirakpur, Punjab, housing a variety of animals and birds.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.8100, 30.6700]
    }
  },
  {
    "name": "Harike Wetland",
    "desc": "A man-made wetland bordering Tarn Taran Sahib district in Punjab, a significant habitat for migratory birds.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.1700, 31.1700]
    }
  },
  {
    "name": "Kapurthala Heritage Sites",
    "desc": "Kapurthala city in Punjab showcases a blend of French and Indo-Saracenic architecture in its palaces and gardens.",
    "state": "Punjab",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.3833, 31.3833]
    }
  },
  {
    "name": "Kerala Backwaters",
    "desc": "A network of serene canals, lakes, and lagoons stretching parallel to the Arabian Sea coast of Kerala. Famous for houseboat cruises.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.3333, 9.5000]
    }
  },
  {
    "name": "Munnar",
    "desc": "A hill station in Kerala known for its sprawling tea plantations, scenic hills, and misty landscapes.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.0500, 10.0833]
    }
  },
  {
    "name": "Kochi (Cochin)",
    "desc": "A vibrant port city in Kerala with a rich history, known for its colonial architecture, Chinese fishing nets, and spice markets.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.2667, 9.9333]
    }
  },
  {
    "name": "Thiruvananthapuram (Trivandrum)",
    "desc": "The capital city of Kerala, known for its temples, beaches (like Kovalam), and museums.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.9500, 8.4833]
    }
  },
  {
    "name": "Wayanad",
    "desc": "A rural district in Kerala with lush green hills, waterfalls, historical caves, and spice plantations.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.0000, 11.6667]
    }
  },
  {
    "name": "Thekkady (Periyar National Park)",
    "desc": "Known for its wildlife sanctuary, Periyar National Park, offering opportunities for wildlife spotting and boat safaris.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.1667, 9.6000]
    }
  },
  {
    "name": "Alappuzha (Alleppey)",
    "desc": "Famous for its backwaters, houseboat stays, and serene beaches.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.3333, 9.5000]
    }
  },
  {
    "name": "Bekal Fort",
    "desc": "The largest fort in Kerala, offering stunning views of the Arabian Sea.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.0333, 12.3833]
    }
  },
  {
    "name": "Varkala Beach",
    "desc": "A cliffside beach in Kerala known for its natural springs and the Janardhana Swami Temple.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.7167, 8.7333]
    }
  },
  {
    "name": "Kovalam Beach",
    "desc": "A popular beach town in Kerala, known for its crescent-shaped beaches and lighthouse.",
    "state": "Kerala",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.9800, 8.4000]
    }
  },
  {
    "name": "Taj Mahal",
    "desc": "An ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, Uttar Pradesh. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his beloved wife, Mumtaz Mahal.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.0421, 27.1751]
    }
  },
  {
    "name": "Varanasi Ghats",
    "desc": "The iconic riverfront steps leading down to the Ganges River in Varanasi, Uttar Pradesh. Known for their religious significance and vibrant atmosphere.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [83.0003, 25.3000]
    }
  },
  {
    "name": "Sarnath",
    "desc": "A place located 10 kilometres northeast of Varanasi near the confluence of the Ganges and the Varuna rivers in Uttar Pradesh, India. The deer park in Sarnath is where Gautama Buddha first taught the Dharma.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [83.0333, 25.3750]
    }
  },
  {
    "name": "Fatehpur Sikri",
    "desc": "A city in Agra district in Uttar Pradesh, India. The city itself was founded as the capital of the Mughal Empire in 1571 by Emperor Akbar, serving this role until 1585, when Akbar abandoned it due to a campaign in Punjab and was subsequently completely abandoned in 1610.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.6638, 27.0902]
    }
  },
  {
    "name": "Allahabad (Prayagraj) Triveni Sangam",
    "desc": "The confluence of three rivers - Ganga, Yamuna, and the mythical Saraswati. A sacred site for Hindus, known for the Kumbh Mela.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [81.8667, 25.4333]
    }
  },
  {
    "name": "Dudhwa National Park",
    "desc": "A national park in the Terai belt of marshy grasslands of northern Uttar Pradesh, India, and bordering Nepal. It stretches over 490.3 km², with a buffer zone of 190 km².",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [80.6477, 28.4388]
    }
  },
  {
    "name": "Mathura",
    "desc": "A city in Uttar Pradesh, India. It is known as the birthplace of the Hindu deity Krishna. It is one of the Sapta Puri, the seven cities considered holy by Hindus.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.6760, 27.4922]
    }
  },
  {
    "name": "Agra Fort",
    "desc": "A historical fort in the city of Agra in Uttar Pradesh, India. It was the main residence of the rulers of the Mughal dynasty until 1638 when the capital was shifted from Agra to Delhi.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.0228, 27.1767]
    }
  },
  {
    "name": "Ayodhya",
    "desc": "A historic city in Uttar Pradesh, India. It is believed to be the birthplace of Rama and is an important pilgrimage site for Hindus.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [82.2167, 26.7900]
    }
  },
  {
    "name": "Jhansi Fort",
    "desc": "A fort situated on a large hilltop called Bangira, in Uttar Pradesh, India. It played a significant role in the Indian Rebellion of 1857.",
    "state": "Uttar Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.5667, 25.4483]
    }
  },
  {
    "name": "Gateway of India",
    "desc": "An arch-monument built in the early twentieth century in the city of Mumbai, India. It was erected to commemorate the landing of King-Emperor George V and Queen Mary at Apollo Bunder during their visit to India in 1911.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [72.8347, 18.9220]
    }
  },
  {
    "name": "Ajanta Caves",
    "desc": "Rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the state of Maharashtra, India.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.7053, 20.5525]
    }
  },
  {
    "name": "Ellora Caves",
    "desc": "One of the largest rock-cut monastery-temple cave complexes in the world, featuring Hindu, Buddhist and Jain monuments, and artwork, dating from the 600–1000 CE period, in Maharashtra, India.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.1042, 20.0267]
    }
  },
  {
    "name": "Marine Drive",
    "desc": "A 3.6-kilometer-long, arc-shaped boulevard along the coast of Back Bay in Mumbai, India. The 'Queen's Necklace' when viewed at night from an elevated point.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [72.8267, 18.9475]
    }
  },
  {
    "name": "Shirdi Sai Baba Temple",
    "desc": "A temple dedicated to the Indian spiritual master Sai Baba, located in Shirdi, Maharashtra.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.4864, 19.7717]
    }
  },
  {
    "name": "Lonavala and Khandala",
    "desc": "Popular hill stations in Maharashtra, known for their scenic beauty, waterfalls, and trekking trails.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.4167, 18.7500]
    }
  },
  {
    "name": "Mahabaleshwar",
    "desc": "A hill station in Maharashtra, known for its evergreen forests, viewpoints, and strawberry farms.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.6667, 17.9269]
    }
  },
  {
    "name": "Elephanta Caves",
    "desc": "A network of sculpted caves located on Elephanta Island in Mumbai Harbour, Maharashtra, India, predominantly dedicated to the Hindu god Shiva.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [72.9342, 18.9642]
    }
  },
  {
    "name": "Bhimashankar Temple",
    "desc": "A Jyotirlinga shrine located 127 km from Pune in the Ghat region of the Sahyadri hills in Maharashtra, India.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.5333, 19.0794]
    }
  },
  {
    "name": "Pune",
    "desc": "A major city in Maharashtra, known for its historical significance, educational institutions, and IT industry. It offers a blend of tradition and modernity with attractions like Shaniwar Wada and Aga Khan Palace.",
    "state": "Maharashtra",
    "coordinates": {
      "type": "Point",
      "coordinates": [73.8567, 18.5204]
    }
  },
  {
    "name": "Srinagar",
    "desc": "The summer capital of Jammu and Kashmir, known for its beautiful gardens, lakes (like Dal Lake and Nagin Lake), and houseboats.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.8000, 34.0800]
    }
  },
  {
    "name": "Dal Lake",
    "desc": "A picturesque lake in Srinagar, Jammu and Kashmir, famous for its shikaras (traditional wooden boats), floating gardens, and houseboats.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.8500, 34.1000]
    }
  },
  {
    "name": "Gulmarg",
    "desc": "A popular hill station and skiing destination in Jammu and Kashmir, known for its stunning meadows and the Gulmarg Gondola (cable car).",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.3800, 34.0500]
    }
  },
  {
    "name": "Pahalgam",
    "desc": "A scenic hill station in Jammu and Kashmir, known for its lush valleys, rivers, and trekking trails. It's also a base for the Amarnath Yatra.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.3300, 34.0100]
    }
  },
  {
    "name": "Sonmarg",
    "desc": "A hill station in Jammu and Kashmir known for its breathtaking glaciers, alpine meadows, and snow-capped peaks.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.3000, 34.3000]
    }
  },
  {
    "name": "Vaishno Devi Temple",
    "desc": "A significant Hindu pilgrimage site located in the Trikuta Mountains of Jammu and Kashmir.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.9500, 33.0300]
    }
  },
  {
    "name": "Jammu City",
    "desc": "The winter capital of Jammu and Kashmir, known for its temples, palaces, and the historic Bahu Fort.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [74.8700, 32.7300]
    }
  },
  {
    "name": "Patnitop",
    "desc": "A hill resort in Jammu and Kashmir known for its scenic beauty, adventure activities, and pleasant climate.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.3300, 33.0800]
    }
  },
  {
    "name": "Hemis National Park",
    "desc": "The largest national park in India by area, located in Ladakh (formerly part of Jammu and Kashmir), known for its snow leopards.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.3000, 33.7000]
    }
  },
  {
    "name": "Nubra Valley",
    "desc": "A high-altitude cold desert in Ladakh, known for its sand dunes, monasteries, and Bactrian camels.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.5000, 34.5000]
    }
  },
  {
    "name": "Leh",
    "desc": "The capital of Ladakh, known for its monasteries, palaces, and stunning mountain scenery.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.5800, 34.1500]
    }
  },
  {
    "name": "Pangong Lake",
    "desc": "A high-altitude saltwater lake in Ladakh, known for its changing colors.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.7000, 33.7500]
    }
  },
  {
    "name": "Kargil",
    "desc": "A town in Ladakh with historical significance and stunning mountain landscapes.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.1300, 34.5700]
    }
  },
  {
    "name": "Magnetic Hill",
    "desc": "A gravity hill located near Leh in Ladakh, where vehicles appear to roll uphill against gravity.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.5500, 34.2500]
    }
  },
  {
    "name": "Shanti Stupa",
    "desc": "A white-domed Buddhist stupa in Leh, Ladakh, offering panoramic views of the surrounding mountains.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.5600, 34.1600]
    }
  },
  {
    "name": "Diskit Monastery",
    "desc": "The oldest and largest Buddhist monastery in the Nubra Valley of Ladakh.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.1400, 34.5700]
    }
  },
  {
    "name": "Spituk Monastery",
    "desc": "A Buddhist monastery located near Leh in Ladakh, known for its impressive architecture and views.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.5300, 34.1300]
    }
  },
  {
    "name": "Thiksey Monastery",
    "desc": "A large and architecturally impressive Tibetan Buddhist monastery in Ladakh.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.6600, 34.0500]
    }
  },
  {
    "name": "Zanskar Valley",
    "desc": "A remote and rugged valley in Ladakh, known for its stunning landscapes and monasteries.",
    "state": "Jammu and Kashmir",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.9000, 33.9000]
    }
  },
  {
    "name": "Gangtok",
    "desc": "The capital city of Sikkim, known for its scenic beauty, monasteries, and views of the Kanchenjunga peak.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.6167, 27.3333]
    }
  },
  {
    "name": "Tsomgo Lake (Changu Lake)",
    "desc": "A glacial lake in Sikkim located at a high altitude, known for its stunning beauty and changing colors.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.7667, 27.3833]
    }
  },
  {
    "name": "Nathula Pass",
    "desc": "A mountain pass in the Himalayas connecting Sikkim with China. Known for its scenic beauty and strategic importance.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.7833, 27.4000]
    }
  },
  {
    "name": "Pelling",
    "desc": "A town in Sikkim known for its monasteries, waterfalls, and stunning views of the Kanchenjunga range.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.2333, 27.3167]
    }
  },
  {
    "name": "Lachung",
    "desc": "A town in North Sikkim located near the border with Tibet, known for its natural beauty and as a base for exploring Yumthang Valley.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.6167, 27.6833]
    }
  },
  {
    "name": "Yumthang Valley (Valley of Flowers)",
    "desc": "A scenic valley in North Sikkim, famous for its rhododendron sanctuaries and hot springs.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.7167, 27.7333]
    }
  },
  {
    "name": "Rumtek Monastery",
    "desc": "One of the largest and most significant monasteries in Sikkim, known for its beautiful architecture and religious importance.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.5667, 27.2333]
    }
  },
  {
    "name": "Ravangla",
    "desc": "A small tourist town in South Sikkim, known for its Buddha Park and scenic views.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.3667, 27.2000]
    }
  },
  {
    "name": "Namchi",
    "desc": "A town in South Sikkim known for its large statues, monasteries, and cultural significance.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.3500, 27.1833]
    }
  },
  {
    "name": "Kanchenjunga National Park",
    "desc": "A UNESCO World Heritage site in Sikkim, home to diverse flora and fauna and stunning views of Mount Kanchenjunga.",
    "state": "Sikkim",
    "coordinates": {
      "type": "Point",
      "coordinates": [88.6000, 27.6000]
    }
  },
  {
    "name": "Shillong",
    "desc": "The capital city of Meghalaya, known for its rolling hills, waterfalls, and pleasant climate.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.8833, 25.5667]
    }
  },
  {
    "name": "Cherrapunji (Sohra)",
    "desc": "One of the wettest places on Earth, known for its living root bridges, waterfalls (like Nohkalikai Falls), and caves.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.7000, 25.2700]
    }
  },
  {
    "name": "Mawlynnong",
    "desc": "Known as the 'Cleanest Village in Asia', offering scenic beauty and living root bridges.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [92.0167, 25.1500]
    }
  },
  {
    "name": "Dawki",
    "desc": "A town in Meghalaya known for the crystal-clear Umngot River and the Indo-Bangladesh border.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [92.0000, 25.1833]
    }
  },
  {
    "name": "Elephant Falls",
    "desc": "A popular waterfall near Shillong, Meghalaya, known for its unique rock formations.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.8667, 25.5500]
    }
  },
  {
    "name": "Mawsmai Cave",
    "desc": "One of the many limestone caves in Meghalaya, known for its impressive stalactites and stalagmites.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.7167, 25.2500]
    }
  },
  {
    "name": "Laitlum Canyons",
    "desc": "A scenic canyon in Meghalaya offering breathtaking views of the surrounding hills and valleys.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.9333, 25.4333]
    }
  },
  {
    "name": "Umiam Lake (Barapani Lake)",
    "desc": "A large man-made reservoir near Shillong, Meghalaya, popular for boating and water sports.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.9500, 25.6833]
    }
  },
  {
    "name": "Don Bosco Centre for Indigenous Cultures",
    "desc": "A museum in Shillong, Meghalaya, showcasing the diverse cultures of Northeast India.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.8800, 25.5700]
    }
  },
  {
    "name": "Living Root Bridges",
    "desc": "Unique natural bridges found in Meghalaya, formed by the aerial roots of rubber fig trees.",
    "state": "Meghalaya",
    "coordinates": {
      "type": "Point",
      "coordinates": [91.7000, 25.2700]
    }
  },
  {
    "name": "Hyderabad",
    "desc": "The capital city of Telangana, known for its rich history, Nizami culture, and iconic landmarks like Charminar and Golconda Fort.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.4744, 17.3753]
    }
  },
  {
    "name": "Charminar",
    "desc": "An iconic historical monument and mosque located in Hyderabad, Telangana, a symbol of the city.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.4756, 17.3616]
    }
  },
  {
    "name": "Golconda Fort",
    "desc": "A magnificent fort in Hyderabad, Telangana, known for its acoustics and historical significance.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.4075, 17.3850]
    }
  },
  {
    "name": "Ramoji Film City",
    "desc": "The world's largest integrated film studio complex, located in Hyderabad, Telangana, offering entertainment and tourism.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.6805, 17.2533]
    }
  },
  {
    "name": "Hussain Sagar Lake",
    "desc": "A heart-shaped lake in Hyderabad, Telangana, with a monolithic statue of Buddha in the center.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.4800, 17.4200]
    }
  },
  {
    "name": "Salar Jung Museum",
    "desc": "An art museum located in Hyderabad, Telangana, housing a vast collection of artifacts from around the world.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.4778, 17.3639]
    }
  },
  {
    "name": "Birla Mandir (Hyderabad)",
    "desc": "A white marble temple dedicated to Lord Venkateswara, located on a hillock in Hyderabad, Telangana.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.4622, 17.4008]
    }
  },
  {
    "name": "Chilkur Balaji Temple",
    "desc": "A popular temple near Hyderabad, Telangana, known as the 'Visa Balaji Temple'.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.3172, 17.3331]
    }
  },
  {
    "name": "Qutb Shahi Tombs",
    "desc": "A complex of tombs of the rulers of the Qutb Shahi dynasty, located in Hyderabad, Telangana.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.4344, 17.3889]
    }
  },
  {
    "name": "Mekong River Cruise (Simulated at Ramoji Film City)",
    "desc": "While not a natural site, Ramoji Film City offers a simulated Mekong River cruise experience.",
    "state": "Telangana",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.6805, 17.2533]
    }
  },
  {
    "name": "Amaravati",
    "desc": "A historical town in Andhra Pradesh, known for its Buddhist stupa and archaeological sites.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [80.5786, 16.5672]
    }
  },
  {
    "name": "Visakhapatnam (Vizag)",
    "desc": "A major port city in Andhra Pradesh, known for its beaches, hills, and industrial development.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [83.2185, 17.6868]
    }
  },
  {
    "name": "Tirupati",
    "desc": "A major pilgrimage town in Andhra Pradesh, famous for the Sri Venkateswara Temple.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [79.4800, 13.6300]
    }
  },
  {
    "name": "Araku Valley",
    "desc": "A scenic hill station in Andhra Pradesh, known for its coffee plantations and tribal culture.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [83.0700, 18.3300]
    }
  },
  {
    "name": "Borra Caves",
    "desc": "Limestone caves located in the Ananthagiri hills of Andhra Pradesh, known for their stalactite and stalagmite formations.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [83.0333, 18.3333]
    }
  },
  {
    "name": "Vijayawada",
    "desc": "A city in Andhra Pradesh located on the banks of the Krishna River, known for the Kanaka Durga Temple and Undavalli Caves.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [80.6500, 16.5000]
    }
  },
  {
    "name": "Gandikota",
    "desc": "Known as the 'Grand Canyon of India', a gorge formed by the Penna River in Andhra Pradesh.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.2900, 14.8200]
    }
  },
  {
    "name": "Lepakshi",
    "desc": "A historical village in Andhra Pradesh known for its Veerabhadra Temple with intricate carvings and a monolithic Nandi statue.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.6100, 13.8200]
    }
  },
  {
    "name": "Horsley Hills",
    "desc": "A hill station in Andhra Pradesh offering scenic views and a pleasant climate.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.3800, 13.6700]
    }
  },
  {
    "name": "Srisailam",
    "desc": "A pilgrimage town in Andhra Pradesh known for the Mallikarjuna Jyotirlinga Temple and the Srisailam Dam.",
    "state": "Andhra Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.8600, 16.0700]
    }
  },
  {
    "name": "Shimla",
    "desc": "The capital city of Himachal Pradesh, a popular hill station known for its colonial architecture, the Mall Road, and scenic beauty.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.1734, 31.1048]
    }
  },
  {
    "name": "Manali",
    "desc": "A high-altitude resort town in Himachal Pradesh, known for its Beas River, adventure activities, and scenic Himalayan views.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.1895, 32.2432]
    }
  },
  {
    "name": "Dharamshala",
    "desc": "A city in Himachal Pradesh, known as the home of the Dalai Lama and the center of Tibetan culture in exile.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.3255, 32.2178]
    }
  },
  {
    "name": "Dalhousie",
    "desc": "A charming hill station in Himachal Pradesh with colonial-era architecture and scenic views of the Dhauladhar ranges.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [75.9773, 32.5364]
    }
  },
  {
    "name": "Kullu Valley",
    "desc": "A broad open valley in Himachal Pradesh formed by the Beas River, known for its apple orchards, temples, and scenic beauty.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.1167, 31.9500]
    }
  },
  {
    "name": "Spiti Valley",
    "desc": "A high-altitude cold desert mountain valley in Himachal Pradesh, known for its stark landscapes, ancient monasteries, and Tibetan Buddhist culture.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [78.0326, 32.2685]
    }
  },
  {
    "name": "Mcleod Ganj",
    "desc": "A suburb of Dharamshala in Himachal Pradesh, also known as 'Little Lhasa', the residence of the Dalai Lama and a hub of Tibetan culture.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.3218, 32.2447]
    }
  },
  {
    "name": "Rohtang Pass",
    "desc": "A high mountain pass on the eastern Pir Panjal Range of the Himalayas in Himachal Pradesh, offering stunning views (subject to seasonal opening).",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.2200, 32.3656]
    }
  },
  {
    "name": "Kasol",
    "desc": "A small village in Himachal Pradesh, popular among backpackers and known for its scenic beauty and laid-back atmosphere in the Parvati Valley.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [77.3100, 32.0097]
    }
  },
  {
    "name": "Bir and Billing",
    "desc": "A popular destination in Himachal Pradesh for paragliding, with Bir being the landing site and Billing the take-off point.",
    "state": "Himachal Pradesh",
    "coordinates": {
      "type": "Point",
      "coordinates": [76.7100, 31.8800]
    }
  }

]
async function main(){
    try {
        let states = await State.find({}).lean();
        let stateMap = {}
        states.forEach(state => {
          JSON.parse(JSON.stringify(state))
          stateMap[state.name] = state._id;
        });
        
        console.log({stateMap}, "\n\n")
        
        placesData.forEach(place => {
          console.log({place})
          place['stateId'] = stateMap[place.state]; 
        });

        console.log("\n\n\n",{placesData})

        await Place.insertMany(placesData);
        console.log('Places data inserted successfully');
    } catch (error) {
        console.error('Error inserting places data:', error);
    } finally {
        mongoose.connection.close();
    }
}

const generateStateCode = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

async function uploadStates() {
  try {
    const stateNames = [...new Set(placesData.map(p => p.state.trim()))];

    const existingStates = await State.find({ name: { $in: stateNames } }).select('name');
    const existingNames = existingStates.map(s => s.name);

    const defaultImage = 'https://placehold.co/600x400';
    const newStates = stateNames
      .filter(name => !existingNames.includes(name))
      .map(name => ({
        name,
        code: generateStateCode(name),
        desc: `Explore the beauty and culture of ${name}.`,
        heroImage: defaultImage,
        heroDescription: `Discover top destinations and hidden gems of ${name}.`,
      }));

    if (newStates.length) {
      await State.insertMany(newStates);
      console.log(`✅ Inserted ${newStates.length} new states.`);
    } else {
      console.log('✅ No new states to insert.');
    }
  } catch (err) {
    console.error('❌ Error inserting states:', err);
  } finally {
    mongoose.connection.close();
  }
}