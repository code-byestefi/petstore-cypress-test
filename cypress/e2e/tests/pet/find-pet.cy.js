import { CommonMethods } from "../../services/common/common.methods";
import { PetBodyBuilder } from "../../services/pet/pet-body.builder";
import { PetMethods } from "../../services/pet/pet.methods";

describe('Find Pet by Id', ()=> {

    it('Find Pet by Id - Happy path', ()=> {

        const petId = PetMethods.generatePetId();
        const categoryId = PetMethods.generateCategoryId();
        const nameCategory = PetMethods.generateRandomCategory();
        const namePet = CommonMethods.generateName();
        const status = PetMethods.generateRandomStatus();
        const photoUrl = [`https://${CommonMethods.generateName()}.png`]
        const tags = CommonMethods.generateName()

        const body = new PetBodyBuilder().setPetId(petId).setCategoryId(categoryId).setCategory(nameCategory).setPetName(namePet).setPhotoUrls(photoUrl).setTag([tags]).setStatus(status).build();

        cy.log('PRE-CONDITION : Create a pet');
        PetMethods.addPet(body)

        cy.log('Send Request "find pet by id')
        PetMethods.getPetById(petId).then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.id).to.eql(petId)
            expect(response.body.category.id).to.eql(categoryId)
            expect(response.body.category.name).to.eql(nameCategory)
            expect(response.body.name).to.eql(namePet)
            expect(response.body.tags[0].id).to.eql(0)
            expect(response.body.tags[0].name).to.eql(tags);
            expect(response.body.status).to.eql(status);
        })
    });


    it('Find pet by status available', () => {
        const availablePetId = PetMethods.generatePetId();
        const soldPetId = PetMethods.generatePetId();
        const pendingPetId = PetMethods.generatePetId();
    
        PetMethods.createAvailablePet(availablePetId)
        PetMethods.createSoldPet(soldPetId)
        PetMethods.createPendingPet(pendingPetId)

        PetMethods.getPetByStatus('available').then(response => {
            expect(response.status).to.eql(200)
            PetMethods.verifyStatusListStatus(response.body, 'available')
            PetMethods.verifyPetIdIncludedInTheList(response.body, availablePetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, soldPetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, pendingPetId)
        })


    })

    it('Find pet by status sold', () => {
        const availablePetId = PetMethods.generatePetId();
        const soldPetId = PetMethods.generatePetId();
        const pendingPetId = PetMethods.generatePetId();
    
        PetMethods.createAvailablePet(availablePetId)
        PetMethods.createSoldPet(soldPetId)
        PetMethods.createPendingPet(pendingPetId)

        PetMethods.getPetByStatus('sold').then(response => {
            expect(response.status).to.eql(200)
            PetMethods.verifyStatusListStatus(response.body, 'sold')
            PetMethods.verifyPetIdIncludedInTheList(response.body, soldPetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, availablePetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, pendingPetId)
        })


    })

    it('Find pet by status pending', () => {
        const availablePetId = PetMethods.generatePetId();
        const soldPetId = PetMethods.generatePetId();
        const pendingPetId = PetMethods.generatePetId();
    
        PetMethods.createAvailablePet(availablePetId)
        PetMethods.createSoldPet(soldPetId)
        PetMethods.createPendingPet(pendingPetId)

        PetMethods.getPetByStatus('pending').then(response => {
            expect(response.status).to.eql(200)
            PetMethods.verifyStatusListStatus(response.body, 'pending')
            PetMethods.verifyPetIdIncludedInTheList(response.body, pendingPetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, availablePetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, soldPetId)
        })


    })


});
