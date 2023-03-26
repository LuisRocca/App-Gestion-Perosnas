import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests that a client is deleted after confirmation and the clients field is updated accordingly. tags: [happy path]

    it("test_deleting_client: should delete a client after confirmation and update the clients field", () => {
        const dataService = {
            deleteClient: jest.fn(),
            getClients: jest.fn(),
            clients: [{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}]
        }
        const homeComponent = new HomeComponent(dataService , null);
        homeComponent.deleteClient(1);
        expect(dataService.deleteClient).toHaveBeenCalledWith(1);
        expect(dataService.getClients).toHaveBeenCalled();
        expect(homeComponent.clients).toEqual([{id: 2, name: "Jane Doe"}]);
    });
// Tests that the list of clients is retrieved and displayed on the page. tags: [happy path]

    it("test_retrieving_clients: should retrieve the list of clients and display them on the page", () => {
        const dataService = {
            getClients: jest.fn(() => {
                return {
                    then: (callback) => {
                        callback([{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}]);
                    }
                }
            }),
            clients: []
        }
        const homeComponent = new HomeComponent(dataService, null);
        homeComponent.ngOnInit();
        expect(dataService.getClients).toHaveBeenCalled();
        setTimeout(() => {
            expect(homeComponent.clients).toEqual([{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}]);
        }, 500);
    });
Tests that a modal window is opened to display client details and the clientdetail field is set accordingly. tags: [happy path]

    it("test_opening_modal: should open a modal window to display client details and set the clientdetail field accordingly", () => {
        const dataService = {
            getClientDetail: jest.fn(() => {
                return {
                    then: (callback) => {
                        callback({id: 1, name: "John Doe"});
                    }
                }
            }),
            clientDetail: {}
        }
        const modalService = {
            open: jest.fn()
        }
        const homeComponent = new HomeComponent(dataService, modalService);
        homeComponent.open(null, 1);
        expect(dataService.getClientDetail).toHaveBeenCalledWith("1");
        setTimeout(() => {
            expect(homeComponent.clientdetail).toEqual({id: 1, name: "John Doe"});
            expect(modalService.open).toHaveBeenCalled();
        }, 500);
    });
// Tests that an error is thrown when attempting to retrieve details of a client with an invalid id. tags: [edge case]

    it("test_retrieving_invalid_client_details", () => {
        const homeComponent = new HomeComponent(new DataService(), new NgbModal());
        expect(() => homeComponent.goToDetail("invalid_id")).toThrowError();
    });
// Tests that an error is thrown when attempting to delete a client with an invalid id. tags: [edge case]

    it("test_deleting_invalid_client", () => {
        const dataService = new DataService();
        const deleteClientSpy = jest.spyOn(dataService, "deleteClient");
        deleteClientSpy.mockImplementation(() => {
            throw new Error();
        });
        const homeComponent = new HomeComponent(dataService, new NgbModal());
        expect(() => homeComponent.deleteClient("invalid_id")).toThrowError();
        deleteClientSpy.mockRestore();
    });
// Tests that an error is thrown when attempting to open a modal window with an invalid id. tags: [edge case]

    it("test_opening_modal_with_invalid_id", () => {
        const homeComponent = new HomeComponent(new DataService(), new NgbModal());
        expect(() => homeComponent.open({}, "invalid_id")).toThrowError();
    });
});
