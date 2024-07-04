import { CommonMethods } from "../../services/common/common.methods";
import { PetBodyBuilder } from "../../services/pet/pet-body.builder";
import { PetMethods } from "../../services/pet/pet.methods";

describe('Add pet', ()=> {


    it('Update pet - happy path', () => {
        const PetId = PetMethods.generatePetId();
        const categoryId = PetMethods.generateCategoryId();
        const nameCategory = PetMethods.generateRandomCategory();
        const namePet = CommonMethods.generateName();
        const status = PetMethods.generateRandomStatus();
        const photoUrl = [`https://${CommonMethods.generateName()}.png`]
        const tags = CommonMethods.generateName()
        const body = new PetBodyBuilder().setBodyWithRandomData(PetId).build();


        const updateBody = new PetBodyBuilder().setPetId(PetId).setCategoryId(categoryId).setCategory(nameCategory).setPetName(namePet).setPhotoUrls(photoUrl).setTag([tags]).setStatus(status).build();

        cy.log('PRE-CONDITION : Create a pet')
        PetMethods.addPet(body)

        cy.log('Sending update pet request')
        PetMethods.updatePet(updateBody).then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.id).to.eql(PetId)
            expect(response.body.category.id).to.eql(categoryId)
            expect(response.body.category.name).to.eql(nameCategory)
            expect(response.body.name).to.eql(namePet)
            expect(response.body.tags[0].id).to.eql(0)
            expect(response.body.tags[0].name).to.eql(tags);
            expect(response.body.status).to.eql(status);
        });
        cy.wait(20000)
    })
});