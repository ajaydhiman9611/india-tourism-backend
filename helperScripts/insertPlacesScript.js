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
      "name": "Visakhapatnam",
      "desc": "Known for its beautiful beaches and the Araku Valley.",
      "state": "Andhra Pradesh",
      "coordinates": {
        "type": "Point",
        "coordinates": [83.3182, 17.6868]
      }
    },
    {
      "name": "Tawang Monastery",
      "desc": "One of the largest monasteries in India, located in Arunachal Pradesh.",
      "state": "Arunachal Pradesh",
      "coordinates": {
        "type": "Point",
        "coordinates": [27.5514, 91.5766]
      }
    },
    {
      "name": "Kaziranga National Park",
      "desc": "A UNESCO World Heritage Site famous for its one-horned rhinoceros.",
      "state": "Assam",
      "coordinates": {
        "type": "Point",
        "coordinates": [93.1694, 26.6636]
      }
    },
    {
      "name": "Bodh Gaya",
      "desc": "A pilgrimage site where Gautama Buddha attained enlightenment.",
      "state": "Bihar",
      "coordinates": {
        "type": "Point",
        "coordinates": [84.9928, 24.6955]
      }
    },
    {
      "name": "Chitrakote Waterfall",
      "desc": "Known as the 'Niagara of India', it's a beautiful waterfall in Chhattisgarh.",
      "state": "Chhattisgarh",
      "coordinates": {
        "type": "Point",
        "coordinates": [81.8728, 19.1205]
      }
    },
    {
      "name": "Baga Beach",
      "desc": "A popular beach known for its nightlife in Goa.",
      "state": "Goa",
      "coordinates": {
        "type": "Point",
        "coordinates": [73.7516, 15.5523]
      }
    },
    {
      "name": "Gir National Park",
      "desc": "The only habitat of Asiatic lions in India, located in Gujarat.",
      "state": "Gujarat",
      "coordinates": {
        "type": "Point",
        "coordinates": [70.4014, 21.1116]
      }
    },
    {
      "name": "Sultanpur National Park",
      "desc": "A bird sanctuary in Haryana, famous for migratory birds.",
      "state": "Haryana",
      "coordinates": {
        "type": "Point",
        "coordinates": [76.9864, 28.4322]
      }
    },
    {
      "name": "Shimla",
      "desc": "The capital of Himachal Pradesh, known for its scenic views and colonial architecture.",
      "state": "Himachal Pradesh",
      "coordinates": {
        "type": "Point",
        "coordinates": [77.1734, 31.1048]
      }
    },
    {
      "name": "Netarhat",
      "desc": "Known as the 'Queen of Chotanagpur', it's famous for its sunrise and sunset views.",
      "state": "Jharkhand",
      "coordinates": {
        "type": "Point",
        "coordinates": [84.4664, 23.8852]
      }
    },
    {
      "name": "Mysore Palace",
      "desc": "A historical palace in Karnataka known for its grandeur and architecture.",
      "state": "Karnataka",
      "coordinates": {
        "type": "Point",
        "coordinates": [76.6555, 12.3051]
      }
    },
    {
      "name": "Alleppey Backwaters",
      "desc": "Famous for its houseboat cruises and scenic beauty in Kerala.",
      "state": "Kerala",
      "coordinates": {
        "type": "Point",
        "coordinates": [76.3393, 9.5706]
      }
    },
    {
      "name": "Khajuraho Temples",
      "desc": "Famous for their intricate sculptures and erotic carvings in Madhya Pradesh.",
      "state": "Madhya Pradesh",
      "coordinates": {
        "type": "Point",
        "coordinates": [79.9300, 24.8324]
      }
    },
    {
      "name": "Gateway of India",
      "desc": "An iconic monument located in Mumbai, Maharashtra.",
      "state": "Maharashtra",
      "coordinates": {
        "type": "Point",
        "coordinates": [72.8347, 18.9217]
      }
    },
    {
      "name": "Loktak Lake",
      "desc": "The largest freshwater lake in northeastern India, located in Manipur.",
      "state": "Manipur",
      "coordinates": {
        "type": "Point",
        "coordinates": [93.6487, 24.5752]
      }
    },
    {
      "name": "Living Root Bridges",
      "desc": "Unique bridges made from the roots of rubber trees, located in Meghalaya.",
      "state": "Meghalaya",
      "coordinates": {
        "type": "Point",
        "coordinates": [91.5822, 25.4958]
      }
    },
    {
      "name": "Aizawl",
      "desc": "The capital city of Mizoram known for its scenic hills.",
      "state": "Mizoram",
      "coordinates": {
        "type": "Point",
        "coordinates": [92.7270, 23.1645]
      }
    },
    {
      "name": "Kohima War Cemetery",
      "desc": "A war memorial located in Nagaland.",
      "state": "Nagaland",
      "coordinates": {
        "type": "Point",
        "coordinates": [94.1122, 25.6723]
      }
    },
    {
      "name": "Konark Sun Temple",
      "desc": "A UNESCO World Heritage Site known for its architectural excellence in Odisha.",
      "state": "Odisha",
      "coordinates": {
        "type": "Point",
        "coordinates": [86.0946, 19.8871]
      }
    },
    {
      "name": "Golden Temple",
      "desc": "The holiest Gurdwara of Sikhism located in Punjab.",
      "state": "Punjab",
      "coordinates": {
        "type": "Point",
        "coordinates": [74.6249, 31.6200]
      }
    },
    {
      "name": "Jaipur",
      "desc": "Known as the 'Pink City', famous for its palaces and forts in Rajasthan.",
      "state": "Rajasthan",
      "coordinates": {
        "type": "Point",
        "coordinates": [75.8523, 26.9124]
      }
    },
    {
      "name": "Pelling",
      "desc": "A beautiful hill station known for its views of Kanchenjunga in Sikkim.",
      "state": "Sikkim",
      "coordinates": {
        "type": "Point",
        "coordinates": [88.6159, 27.1989]
      }
    },
    {
      "name": "Kanyakumari",
      "desc": "The southernmost tip of mainland India, known for its scenic beauty in Tamil Nadu.",
      "state": "Tamil Nadu",
      "coordinates": {
        "type": "Point",
        "coordinates": [77.5702, 8.0889]
      }
    },
    {
      "name": "Hyderabad",
      "desc": "Known for its history, culture, and cuisine in Telangana.",
      "state": "Telangana",
      "coordinates": {
        "type": "Point",
        "coordinates": [78.4744, 17.3850]
      }
    },
    {
      "name": "Ujjanta Palace",
      "desc": "A beautiful palace located in Agartala, Tripura.",
      "state": "Tripura",
      "coordinates": {
        "type": "Point",
        "coordinates": [91.2854, 23.8364]
      }
    },
    {
      "name": "Taj Mahal",
      "desc": "A UNESCO World Heritage Site and a symbol of love located in Uttar Pradesh.",
      "state": "Uttar Pradesh",
      "coordinates": {
        "type": "Point",
        "coordinates": [78.0421, 27.1751]
      }
    },
    {
      "name": "Auli",
      "desc": "A popular skiing destination in Uttarakhand.",
      "state": "Uttarakhand",
      "coordinates": {
        "type": "Point",
        "coordinates": [79.5862, 30.4319]
      }
    },
    {
      "name": "Sundarbans",
      "desc": "A UNESCO World Heritage Site known for its mangroves in West Bengal.",
      "state": "West Bengal",
      "coordinates": {
        "type": "Point",
        "coordinates": [88.7919, 21.1676]
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