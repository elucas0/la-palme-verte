/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

export class User {
  id: string;
  name: string;
  surname: string;
  role: string;
  imageUrl: string;
  instagram: string;
  linkedin: string;

  constructor(id: string, name: string, surname: string, role: string, imageUrl: string, instagram: string, linkedin: string,) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.imageUrl = imageUrl;
    this.instagram = instagram;
    this.linkedin = linkedin;
  }

  static fromNotion(user: any) {
    const id = user.id;
    const name = user.properties?.Prénom.title[0].text.content;
    const surname = user.properties?.Nom.rich_text[0].text.content;
    const role = user.properties?.Rôle.select.name;
    const photoDeProfilProperty = user.properties?.['Photo de profil'];
    const imageUrl = photoDeProfilProperty ? photoDeProfilProperty.files[0]?.file?.url : undefined;
    const instagram = user.properties?.Instagram.url;
    const linkedin = user.properties?.Linkedin.url;

    return new User(id, name, surname, role, imageUrl, instagram, linkedin);
  }
}
