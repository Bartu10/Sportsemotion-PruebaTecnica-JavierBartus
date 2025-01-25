import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserTaskComponent } from './user-task.component';
import { ApiService } from '../../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('UserTaskComponent', () => {
  let component: UserTaskComponent;
  let fixture: ComponentFixture<UserTaskComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Configuración del entorno de prueba
      imports: [
        RouterTestingModule, // Simulación de rutas
        HttpClientTestingModule, // Simulación de peticiones HTTP
        UserTaskComponent, // Componente en pruebas (standalone)
      ],
      providers: [
        ApiService, // Servicio a probar
        {
          provide: 'ActivatedRoute', // Simulación de parámetros de la ruta
          useValue: { snapshot: { params: { id: 1 } } },
        },
      ],
    }).compileComponents();

    // Inicialización del componente y dependencias
    fixture = TestBed.createComponent(UserTaskComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    // Mock del localStorage para pruebas
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ id: 1, name: 'John Doe', email: 'johndoe@example.com' });
      }
      return null;
    });

    fixture.detectChanges(); // Detecta cambios iniciales en el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    // Verifica que el usuario se inicialice correctamente desde localStorage
    it('should initialize user from localStorage', () => {
      component.ngOnInit();

      expect(component.userComplete).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
      });
    });
  });

  describe('toggleTaskStatus', () => {
    // Prueba que verifica el cambio de estado de las tareas
    it('should toggle task completion status', () => {
      component.tasks = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ];

      component.toggleTaskStatus(component.tasks[0]); // Cambia el estado de la primera tarea

      expect(component.tasks[0].completed).toBeTrue();
      expect(component.completedTasks).toBe(2); // Recalcula tareas completadas
      expect(component.pendingTasks).toBe(0); // Recalcula tareas pendientes
    });
  });

  describe('filterTasks', () => {
    // Prueba para filtrar tareas completadas
    it('should filter tasks by completed', () => {
      component.tasks = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ];

      component.filterTasks('completed'); // Filtra solo las completadas

      expect(component.filteredTasks).toEqual([{ id: 2, title: 'Task 2', completed: true }]);
    });
  });

  describe('sortTasks', () => {
    // Prueba para ordenar tareas alfabéticamente
    it('should sort tasks alphabetically', () => {
      component.filteredTasks = [
        { id: 1, title: 'Task B', completed: false },
        { id: 2, title: 'Task A', completed: true },
      ];

      component.sortTasks({ target: { value: 'alphabetical' } } as any); // Ordena alfabéticamente

      expect(component.filteredTasks).toEqual([
        { id: 2, title: 'Task A', completed: true },
        { id: 1, title: 'Task B', completed: false },
      ]);
    });
  });
});
