import SocialMediaModel from "../models/SocialMediaModel.js"; // asegúrate de ajustar el path

export default class SocialMediaByPlaceRepository {
  constructor(SocialMediaByPlaceModel) {
    this.SocialMediaByPlaceModel = SocialMediaByPlaceModel;
  }

  async getSocialMediaByPlace(idPlace) {
    const socialMediaByPlace = await this.SocialMediaByPlaceModel.findAll({
      where: { idPlace },
      include: [
        {
          model: SocialMediaModel, 
          as: "socialMedia",
        },
      ],
    });

    return socialMediaByPlace.map((socialMedia) => ({
      value: socialMedia.value,
      idSocialMedia: socialMedia.socialMedia.idSocialMedia,
    }));
  }
  async addSocialMediaByPlace(value, idPlace, idSocialMedia) {
    const newSocialMediaByPlace = await this.SocialMediaByPlaceModel.create({
      value,
      idPlace,
      idSocialMedia,
    });

    return {
      value: newSocialMediaByPlace.value,
      idSocialMedia: newSocialMediaByPlace.idSocialMedia,
    };
  }

}
