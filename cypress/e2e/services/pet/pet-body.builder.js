import { CommonMethods } from "../common/common.methods";
import { PetBody } from "./pet-body";
import { PetMethods } from "./pet.methods";

export class PetBodyBuilder {
    constructor() {
        this.body = new PetBody();
        this.body.category = {};
    }

    // settear id de pet
    setPetId(petId) {
        this.body.id = petId;
        return this;
    }

    setCategoryId(categoryId) {
        this.body.category.id = categoryId;
        return this;
    }

    setCategory(categoryName) {
        this.body.category.name = categoryName;
        return this;
    }

    setPetName(petName) {
        this.body.name = petName;
        return this;
    }

    setPhotoUrls(urls) {
        this.body.photoUrls = urls;
        return this;
    }

    setTag(tags) {

        this.body.tags = []

        for(let i=0; i < tags.length; i++){
            this.body.tags.push({
                id: i,
                name: tags[i]
            })
        };
        return this;
    }

    setStatus(status){
        this.body.status = status;
        return this;
    }

    // update pet data
    setBodyWithRandomData(petId) {
        this.body.id = petId;
        this.body.category.id = PetMethods.generateCategoryId();
        this.body.category.name = PetMethods.generateRandomCategory();
        this.body.name = CommonMethods.generateName();
        this.body.photoUrls = [`https://${CommonMethods.generateName()}.png`]
        this.body.tags = [{id: 0, name: CommonMethods.generateName()}]
        this.body.status = PetMethods.generateRandomStatus();

        return this
    }

    build() {
        return this.body;
    }
}