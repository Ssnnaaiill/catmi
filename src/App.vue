<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <strong>🐈 C A T M I 💞</strong>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/facts' }">Facts</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/breeds' }">Breeds</b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item tag="router-link" :to="{ path: '/about' }">About</b-navbar-item>
          <b-navbar-item href="#">Contact</b-navbar-item>
        </b-navbar-dropdown>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" href="https://github.com/Ssnnaaiill/catmi" target="_blank">
              <b-icon pack="fab" icon="github"></b-icon>
              <strong>Github</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

.navbar {
  position: fixed !important;
  z-index: 5;
  top: 0;
  width: 100%;
}

a {
  color: #42b983;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@keyframes loading {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}

.loading {
  margin: 7rem 0 2.8rem 0;
  opacity: 1;
  animation: loading 2s infinite;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;

  .card {
    display: flex;
    flex-direction: column;
    margin: 24px;
    width: 300px;
    min-height: 300px;
    border-radius: 10px;

    figure {
      img {
        border-radius: 10px 10px 0 0;
      }
    }

    .card-content {
      border-radius: 10px 10px 0 0;
      min-height: 250px;
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
    }

    .card-footer {
      .card-footer-item {
        justify-content: space-between !important;
      }
      .icon {
        margin-right: 4px;
        color: #ff3860;
      }
    }

    &:hover {
      box-shadow: 0 10px 50px rgba(70, 50, 120, 0.3),
        0 0 0 1px rgba(10, 10, 10, 0.1);
      transform: translateY(-1px);
      cursor: pointer;
    }
    transition: all 0.25s ease-out;
  }
}
</style>
