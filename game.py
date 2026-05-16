import pygame
import sys
from settings import *
from player import Player
from asteroid import Asteroid
from bullet import Bullet

class Game:
    def __init__(self):
        # Inicializa o pygame e cria a janela
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("Space Shooter - Atari Style")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont("arial", 24)
        
        self.running = True
        self.playing = False
        self.score = 0
        
        # Evento de tempo para criar asteroides
        self.SPAWN_ASTEROID = pygame.USEREVENT + 1
        self.spawn_rate = 2000
        pygame.time.set_timer(self.SPAWN_ASTEROID, self.spawn_rate)
        
    def new(self):
        # Inicia um novo jogo
        self.playing = True
        self.score = 0
        self.spawn_rate = 2000
        pygame.time.set_timer(self.SPAWN_ASTEROID, self.spawn_rate)
        
        # Grupos de sprites para gerenciar os objetos em massa
        self.all_sprites = pygame.sprite.Group()
        self.asteroids = pygame.sprite.Group()
        self.bullets = pygame.sprite.Group()
        
        # Cria a nave
        self.player = Player()
        self.all_sprites.add(self.player)
        
        self.run()
        
    def run(self):
        # Game Loop
        while self.playing:
            self.clock.tick(FPS) # Mantém a taxa de quadros
            self.events()
            self.update()
            self.draw()
            
    def events(self):
        # Gerencia os eventos da janela e teclado
        for event in pygame.event.get():
            # Fechar janela
            if event.type == pygame.QUIT:
                self.playing = False
                self.running = False
            
            # Apertar tecla
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    # Atira
                    bullet = Bullet(self.player.rect.centerx, self.player.rect.top)
                    self.all_sprites.add(bullet)
                    self.bullets.add(bullet)
            
            # Evento temporizador: cria um novo asteroide
            if event.type == self.SPAWN_ASTEROID:
                # Multiplicador de velocidade (aumenta a cada 50 pontos)
                speed_multiplier = self.score // 50
                asteroid = Asteroid(speed_multiplier)
                self.all_sprites.add(asteroid)
                self.asteroids.add(asteroid)

    def update(self):
        # Atualiza o status de todos os sprites (movimentos)
        self.all_sprites.update()
        
        # Checar se algum tiro acertou algum asteroide
        # groupcollide: Deleta ambos se baterem (True, True)
        hits = pygame.sprite.groupcollide(self.asteroids, self.bullets, True, True)
        for hit in hits:
            self.score += 10 # Aumenta a pontuação
            
            # Aumenta a dificuldade (diminui o tempo de spawn a cada 50 pontos)
            if self.score % 50 == 0:
                self.spawn_rate -= 200
                if self.spawn_rate < 400: # Limite mínimo de 400ms
                    self.spawn_rate = 400
                pygame.time.set_timer(self.SPAWN_ASTEROID, self.spawn_rate)
            
        # Checar se um asteroide bateu na nave do jogador
        hits = pygame.sprite.spritecollide(self.player, self.asteroids, False)
        if hits:
            self.playing = False # Fim de jogo
            
        # Checar se um asteroide chegou no fundo da tela
        for asteroid in self.asteroids:
            if asteroid.rect.top > HEIGHT:
                self.playing = False # Fim de jogo

    def draw(self):
        # Preenche o fundo
        self.screen.fill(BLACK)
        
        # Desenha todos os objetos
        self.all_sprites.draw(self.screen)
        
        # Desenha a pontuação
        score_text = self.font.render(f"Pontos: {self.score}", True, WHITE)
        self.screen.blit(score_text, (10, 10))
        
        # Atualiza a tela
        pygame.display.flip()

    def show_game_over_screen(self):
        # Exibe uma tela simples de game over
        self.screen.fill(BLACK)
        game_over_text = self.font.render("GAME OVER", True, RED)
        restart_text = self.font.render("Pressione qualquer tecla para reiniciar", True, WHITE)
        
        self.screen.blit(game_over_text, (WIDTH//2 - game_over_text.get_width()//2, HEIGHT//3))
        self.screen.blit(restart_text, (WIDTH//2 - restart_text.get_width()//2, HEIGHT//2))
        
        pygame.display.flip()
        
        # Aguarda jogador apertar uma tecla
        waiting = True
        while waiting:
            self.clock.tick(FPS)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    waiting = False
                    self.running = False
                if event.type == pygame.KEYUP:
                    waiting = False

# Ponto de entrada do código
if __name__ == "__main__":
    game = Game()
    while game.running:
        game.new()
        if game.running:
            game.show_game_over_screen()
    pygame.quit()
    sys.exit()
