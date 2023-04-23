// all labels: food, nightlife, hiking, biking, water sports, beach, road trips, landmarks

const interestExamples = [
    { text: "I'm coming to Seattle for the next weekend and looking for someone who can take me around the best restaurants. I got a day free, so I would be down to also do any outdoor activities or hikes nearby. On Friday night, I plan to hit the club, and I'm still searching for some good ones in the city.", label: "food" },
    { text: "I'm coming to Seattle for the next weekend and looking for someone who can take me around the best restaurants. I got a day free, so I would be down to also do any outdoor activities or hikes nearby. On Friday night, I plan to hit the club, and I'm still searching for some good ones in the city.", label: "nightlife" },
    { text: "I'm coming to Seattle for the next weekend and looking for someone who can take me around the best restaurants. I got a day free, so I would be down to also do any outdoor activities or hikes nearby. On Friday night, I plan to hit the club, and I'm still searching for some good ones in the city.", label: "hiking" },
    { text: "I'm coming to New York City for a business trip next week, and I'm interested in exploring the local food scene. I'm also an avid cyclist, so I'd love to rent a bike and check out the city on two wheels in my free time.", label: "food" },
    { text: "I'm coming to New York City for a business trip next week, and I'm interested in exploring the local food scene. I'm also an avid cyclist, so I'd love to rent a bike and check out the city on two wheels in my free time.", label: "biking" },
    { text: "I'm visiting Denver for the first time this summer and hoping to explore the great outdoors. I love hiking and camping, and I'm especially excited to check out some of the nearby national parks and forests.", label: "hiking" },
    { text: "I'll be in Austin next month for a music festival, and I'm looking forward to experiencing the city's vibrant nightlife scene. I'm hoping to find some great bars and clubs with live music, and maybe even meet some new friends along the way.", label: "nightlife" },
    { text: "I'm visiting Miami for a beach vacation with my friends next week, and I'm hoping to do some outdoor activities while I'm there. I'm interested in water sports like kayaking and paddleboarding, as well as hiking in some of the nearby nature preserves.", label: "hiking" },
    { text: "I'm visiting Miami for a beach vacation with my friends next week, and I'm hoping to do some outdoor activities while I'm there. I'm interested in water sports like kayaking and paddleboarding, as well as hiking in some of the nearby nature preserves.", label: "water sports" },
    { text: "I'm visiting Miami for a beach vacation with my friends next week, and I'm hoping to do some outdoor activities while I'm there. I'm interested in water sports like kayaking and paddleboarding, as well as hiking in some of the nearby nature preserves.", label: "beach" },
    { text: "I'm traveling to Chicago next month for a family reunion, and I'm hoping to explore the local food scene while I'm there. I'm particularly interested in trying some of the city's famous deep-dish pizza, as well as checking out some of the ethnic neighborhoods like Chinatown and Little Italy.", label: "food" },
    { text: "I'll be in Seattle for a conference next week, but I'm hoping to explore the city's social scene in my free time. I'm interested in finding some great bars and restaurants, as well as meeting some new people and making connections in my industry.", label: "nightlife" },
    { text: "I'm traveling to Portland for a long weekend, and I'm hoping to do some road tripping while I'm there. I'm interested in exploring the scenic byways and national parks in the area, as well as checking out some of the local breweries and wineries.", label: "road trip" },
    { text: "I'm planning a road trip through California this summer, and I'm hoping to explore some of the state's beautiful natural landscapes. I'm interested in visiting national parks like Yosemite and Joshua Tree, as well as driving along the scenic Pacific Coast Highway to see the ocean views. I'm also looking forward to checking out some of the local craft breweries and wineries, and maybe even attending a food or wine festival if there's one happening during my trip.", label: "road trip" },
    { text: "I'm visiting New Orleans for a bachelorette party, and I'm looking forward to experiencing the city's legendary nightlife. I'm hoping to find some great bars and clubs with live music, as well as trying some of the local cuisine like gumbo and beignets.", label: "nightlife" },
    { text: "I'm traveling to Los Angeles for a business trip, but I'm hoping to do some hiking in my free time. I'm interested in exploring some of the local parks and nature reserves, as well as checking out some of the city's famous landmarks like the Hollywood sign and Griffith Observatory.", label: "landmarks" },
    { text: "I'm planning a trip to Hawaii for my honeymoon and I'm hoping to do some outdoor activities while I'm there. I'm interested in snorkeling and scuba diving to see the colorful marine life, as well as hiking in some of the beautiful nature reserves to see the stunning waterfalls and tropical forests. I'm also looking forward to trying some of the local Hawaiian cuisine and experiencing the culture and traditions of the islands.", label: "hiking" },
    { text: "I'm planning a trip to Hawaii for my honeymoon and I'm hoping to do some outdoor activities while I'm there. I'm interested in snorkeling and scuba diving to see the colorful marine life, as well as hiking in some of the beautiful nature reserves to see the stunning waterfalls and tropical forests. I'm also looking forward to trying some of the local Hawaiian cuisine and experiencing the culture and traditions of the islands.", label: "water sports" },
    { text: "I'm planning a trip to Hawaii for my honeymoon and I'm hoping to do some outdoor activities while I'm there. I'm interested in snorkeling and scuba diving to see the colorful marine life, as well as hiking in some of the beautiful nature reserves to see the stunning waterfalls and tropical forests. I'm also looking forward to trying some of the local Hawaiian cuisine and experiencing the culture and traditions of the islands.", label: "food" },
    { text: "I'm planning a trip to New York City to see some of the famous landmarks and attractions. I'm interested in visiting the Statue of Liberty, Empire State Building, and Central Park, as well as checking out some of the museums like the Metropolitan Museum of Art and the American Museum of Natural History. I'm also looking forward to trying some of the local street food and experiencing the culture and energy of the city.", label: "landmarks" },
    { text: "I'm planning a trip to the Caribbean to relax on some of the beautiful beaches. I'm interested in snorkeling and scuba diving to see the colorful marine life, as well as trying out some of the local water sports like jet skiing and parasailing. I'm also looking forward to exploring some of the nearby beach towns and trying the local seafood.", label: "water sports" },
    { text: "I'm planning a trip to the Caribbean to relax on some of the beautiful beaches. I'm interested in snorkeling and scuba diving to see the colorful marine life, as well as trying out some of the local water sports like jet skiing and parasailing. I'm also looking forward to exploring some of the nearby beach towns and trying the local seafood.", label: "beach" },
    { text: "I'm planning a trip to Denver for a mountain biking adventure. I'm an experienced mountain biker and I'm excited to explore some of the famous trails in the area, like the Mount Falcon Trail and the Buffalo Creek Trail. I'm also interested in checking out some of the local bike shops and rentals, and maybe even participating in a local race or event if there's one happening during my stay.", label: "biking" }
];

const gigInputs = [
    "I'm planning a trip to New Orleans next month, and I'm excited to explore the city's vibrant food and music scenes. I'm a huge fan of jazz music and I'm looking forward to visiting some of the city's iconic music venues like Preservation Hall and Tipitina's. In terms of food, I'm eager to try local dishes like gumbo, jambalaya, and po'boys, and I'm open to any recommendations for the best restaurants and street vendors in the city.",
    "I'm planning a trip to Denver next month and I'm looking to explore the natural beauty of the area. I'm a big fan of hiking and I'm hoping to tackle some of Colorado's famous trails like the Mount Bierstadt or the Maroon Bells. I'm also interested in doing some road tripping to see more of the state's stunning scenery, like the Rocky Mountains and Great Sand Dunes National Park. I'm planning to rent a car and drive along the scenic byways, stopping at small towns and scenic overlooks along the way.",
    "I'm planning a trip to Nashville with a group of friends and we're excited to explore the city's vibrant nightlife and music scene. We're interested in checking out live music venues like the Ryman Auditorium and the Bluebird Cafe, as well as some of the local bars and clubs known for their music and atmosphere. During the day, we're also planning to visit some of the city's famous landmarks like the Country Music Hall of Fame and Museum, and take a tour of Music Row. We're looking for recommendations on the best spots to hear live music and dance the night away!",
    "I'm planning a trip to Washington D.C. and I'm interested in exploring the city's landmarks and monuments on two wheels. I'm planning to rent a bike and take a self-guided tour of the National Mall, visiting famous sites like the Lincoln Memorial, the Washington Monument, and the Vietnam Veterans Memorial. I'm also interested in checking out some of the lesser-known landmarks and historic neighborhoods around the city. In my downtime, I'm hoping to try some of the local cuisine and check out some of the city's museums and galleries."
]

const bioExamples = [
    { text: "Hey there, I'm Michael! I've been living in sunny San Diego for a few years now and I love spending my free time out on the water. Whether it's surfing, paddleboarding, or kayaking, I'm always looking for a new adventure on the ocean.", label: "water sports" },
    { text: "Hi! I'm Emily and I'm a student at UT Austin. When I'm not studying, you can usually find me exploring the city's amazing nightlife scene. From live music to rooftop bars, there's always something fun to do here.", label: "nightlife" },
    { text: "Hi, I'm Jack! I've been living in Denver for a while now and I love the city's proximity to the mountains. Whenever I have free time, I'm out on a hike, exploring the beautiful trails and vistas that Colorado has to offer.", label: "hiking" },
    { text: "Hey, I'm Samantha! I'm a Miami native and I absolutely love spending my days at the beach. Whether it's soaking up the sun or playing in the waves, there's no better way to spend a day than by the ocean.", label: "beach" },
    { text: "Hey, I'm Tyler! I've been living in Nashville for a few years now and I love exploring the city's rich musical history. From the Country Music Hall of Fame to the Johnny Cash Museum, there's always something new to discover.", label: "landmarks" },
    { text: "Hi, I'm Maria! I'm a Portland native and I love exploring the city's many bike-friendly trails and streets. There's nothing quite like cruising through the city on a sunny day, taking in all the beautiful scenery.", label: "biking" },
    { text: "Hey there, I'm Alex! I'm a foodie at heart and I've been exploring the amazing food scene in New York City for years now. From street food to high-end restaurants, there's always something delicious to try here.", label: "food" },
    { text: "Hi, I'm Olivia! I've been living in LA for a while now and I love taking weekend road trips to explore all the amazing sights and scenery in Southern California. There's so much to see and do here, and I'm always up for an adventure.", label: "road trips" },
    { text: "Hey, I'm Dylan! I'm a history buff and I love exploring all the amazing landmarks in Seattle. From the Space Needle to Pike Place Market, there's always something fascinating to discover in this beautiful city.", label: "landmarks" },
    { text: "Hey there, I'm Rachel! I've been living in San Francisco for a few years now and I love exploring the beautiful hiking trails in the area. From Mount Tamalpais to Lands End, there's no shortage of stunning views and challenging hikes to conquer.", label: "hiking" },
    { text: "Hey there! I'm Mike, a foodie living in San Francisco. I love trying new restaurants and cuisines, and I'm always on the lookout for hidden gems in the city. From street food to fine dining, I have recommendations for every budget and taste. Let's explore the food scene together!", label: "food" },
    { text: "What's up! I'm Maria, a nightlife enthusiast based in NYC. I know all the best spots to party, from underground clubs to rooftop bars. I'm always up for a good time, and I can help you plan a night out that you won't forget. Let's hit the town!", label: "nightlife" },
    { text: "Hey, I'm Jason, a hiking enthusiast living in Boulder. I spend most of my weekends exploring the beautiful trails in the nearby Rocky Mountains. Whether you're a beginner or an experienced hiker, I can recommend the best routes for you. Let's get outside and enjoy the fresh air!", label: "hiking" },
    { text: "Hola! I'm Emily, a beach lover based in Miami. I know all the best spots to soak up the sun and enjoy the ocean breeze. From popular beaches to hidden coves, I can guide you to the perfect spot to relax and unwind. Let's hit the beach!", label: "beach" },
    { text: "Hey, I'm Sean, a biking enthusiast living in Portland. I love exploring the city on two wheels, whether it's on a road bike or a mountain bike. I can recommend the best routes for every level of cyclist, from easygoing bike paths to challenging mountain trails. Let's ride!", label: "biking" },
    { text: "Hey there! I'm Rachel, a water sports enthusiast based in San Diego. I love surfing, paddleboarding, and kayaking, and I can help you find the perfect spot to try your hand at these activities. Let's hit the waves!", label: "water sports" },
    { text: "What's up! I'm Max, a road trip fanatic living in Austin. I love exploring the great outdoors and hitting the open road. I can recommend some amazing scenic drives, and help you plan the ultimate road trip adventure. Let's hit the highway!", label: "road trips" },
    { text: "Hey there! I'm Jessica, a history buff living in Chicago. I love exploring the city's famous landmarks and learning about its rich cultural heritage. From the Willis Tower to Navy Pier, I can guide you to the best spots to experience Chicago's unique vibe. Let's explore!", label: "landmarks" },
    { text: "Aloha! I'm Daniel, a beach bum living in Honolulu. I love spending my days in the sun, and I know all the best beaches on Oahu. Whether you want to surf, swim, or just relax on the sand, I can help you find the perfect spot to enjoy the ocean. Let's hit the beach!", label: "beach" },
];

const bioInputs = [
    // "Hi there, I'm Maya and I'm a nightlife lover living in New Orleans, Louisiana. I know all the best spots to party in this amazing city, from live music venues to bars with the best drinks. Whether you're interested in jazz music, clubbing, or just exploring the vibrant nightlife scene, I can show you all the hotspots. So if you're ever in New Orleans and want to have a wild night out, hit me up!",
    // "Hey, I'm John and I'm a road trip enthusiast living in Austin, Texas. I love taking long drives on the open road and discovering new places along the way. Whether you're interested in visiting national parks, checking out small towns, or just taking a scenic drive, I can plan the perfect road trip for you. So if you're ever in Austin and want to hit the road, let's make it happen!",
    // "Hi, I'm Sarah and I'm an avid hiker living in Denver, Colorado. I love exploring the beautiful Rocky Mountains and finding hidden trails with breathtaking views. Whether you're looking for a short hike with your family or an intense climb with friends, I can show you all the best spots. So if you're ever in Denver and want to experience the beauty of the Rockies, just give me a shout!",
    "Hey, I'm James and I'm a big fan of water sports. Living in Miami, Florida, I have access to some of the best spots for surfing, paddleboarding, and jet skiing. Whether you're a beginner or an expert, I can take you to some amazing locations with crystal-clear water and perfect waves. So if you're ever in Miami and want to get your adrenaline pumping with some water sports, let me know!"
];

exports.bioExamples = bioExamples;
exports.interestExamples = interestExamples;