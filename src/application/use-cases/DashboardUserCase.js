/*{
    "place": {
        "name": "La Llamarada",
        "description": "Hola",
        "category": "Restaurante"
    },
    "images": {
        "mostVisited": "hola0.png",
        "smallCard": "hola1.png",
        "profileDetail": "hola2.png",
        "gallery": ["hla1.png", "hola2.png"],
        "logo": "hola3.png"
    },
    "socialMedia": {
        "phone": "3125678902",
        "whatsApp": "3125678902",
        "email": "LaConchaDeLaLora@gmail.com",
        "instagram": "conchalora"
    },
    "tags": ["Nature", "Gastronomy"],
    "address": "Cra8 15 53"
}*/
export default class DashBoardUseCase {
    constructor(TagByPlaceRepository, SocialMediaByPlaceRepository, ImageByPlaceRepository, AddressByPlaceRepository, TagRepository, AddressRepository, SocialMediaRepository, ImageCategoryRepository, PlaceRepository, CategoryRepository){
        this.TagByPlaceRepository = TagByPlaceRepository;
        this.SocialMediaByPlaceRepository = SocialMediaByPlaceRepository;
        this.ImageByPlaceRepository = ImageByPlaceRepository;
        this.AddressByPlaceRepository = AddressByPlaceRepository;
        this.TagRepository = TagRepository;
        this.AddressRepository = AddressRepository;
        this.SocialMediaRepository = SocialMediaRepository;
        this.ImageCategoryRepository = ImageCategoryRepository;
        this.PlaceRepository = PlaceRepository;
        this.CategoryRepository = CategoryRepository;
    }
    async execute(images, place, socialMedia, tags, address){
        const name = place.name;
        const description = place.description;
        const categoryName = place.category;

        const placeExistsOnDB = await this.PlaceRepository.getPlaceByName(name);
        if (placeExistsOnDB){
            throw new Error(`Place ${name} already exists`);
        }

        const getCategoryByName = await this.CategoryRepository.getByName(categoryName);
        console.log(JSON.stringify(getCategoryByName, null, 2));

       console.log(tags);
       const tagsByPlace = await this.TagRepository.getTagsByNames(tags)
       const idTags = tagsByPlace.map(tag => tag.idTag);
       const addPlace = await this.PlaceRepository.addPlace(name, description, getCategoryByName.idCategory);
       const addTagsByPlace = await this.TagByPlaceRepository.addTagsByPlace(addPlace.idPlace, idTags);

        const processImages = await Promise.all(
            Object.entries(images).map(async ([key, value]) => {
                const category = await this.ImageCategoryRepository.getImageCategoryByName(key);
                return {
                idImageCategory: category?.idImageCategory ?? null,
                value
                };
        })
        );
            
        console.log(JSON.stringify(processImages, null, 2));


        const results = [];
        for (const { idImageCategory, value } of processImages) {
          if (!idImageCategory) continue; 
          if (Array.isArray(value)) {
            for (const url of value) {
              const newImage = await this.ImageByPlaceRepository.addImageByPlace(url, addPlace.idPlace, idImageCategory);
              results.push(newImage);
            }
          } else {
            const newImage = await this.ImageByPlaceRepository.addImageByPlace(value, addPlace.idPlace, idImageCategory);
            results.push(newImage);
          }
        } 

        console.log("Imágenes guardadas:", results);
        const processSocialMedia = await Promise.all(
            Object.entries(socialMedia).map(async ([key, value]) => {
                const social = await this.SocialMediaRepository.getSocialMediaByName(key);
                return {
                    idSocialMedia: social?.idSocialMedia ?? null,
                    value
                }
            })
        );
        const socialMediaResults = [];
        for (const { idSocialMedia, value } of processSocialMedia) {
            if (!idSocialMedia) continue;
            const newSocialMedia = await this.SocialMediaByPlaceRepository.addSocialMediaByPlace(value, addPlace.idPlace, idSocialMedia);
            socialMediaResults.push(newSocialMedia);
        }
        console.log(JSON.stringify(processSocialMedia, null, 2));
        console.log("social media has been saved:", socialMediaResults);
       const addAddress = await this.AddressRepository.addAddress(address);
       const addAddressByPlace = await this.AddressByPlaceRepository.addAddressByPlace(addPlace.idPlace, addAddress.idAddress);

        return {
            holi: "Place Created Successfully!"
        }
    }
}