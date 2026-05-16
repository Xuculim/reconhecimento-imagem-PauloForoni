import pygame
import random
from settings import *

class Asteroid(pygame.sprite.Sprite):
    def __init__(self, speed_multiplier=0):
        super().__init__()
        # Tamanho aleatório para variar os inimigos
        size = random.randint(20, 50)
        self.image = pygame.Surface((size, size))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        
        # Posição inicial aleatória no topo, acima da visão da tela
        self.rect.x = random.randrange(0, WIDTH - self.rect.width)
        self.rect.y = random.randrange(-100, -40)
        
        # Sorteia uma velocidade de queda
        min_speed = ASTEROID_MIN_SPEED + speed_multiplier
        max_speed = ASTEROID_MAX_SPEED + speed_multiplier
        self.speedy = random.randrange(min_speed, max_speed)

    def update(self):
        self.rect.y += self.speedy
        # Obs: se sair da tela, o jogo é finalizado (verificado no game.py)
