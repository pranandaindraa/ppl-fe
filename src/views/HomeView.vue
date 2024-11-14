<template>
  <div class="container mt-2 shadow-lg rounded">
    <h2 class="mb-4">Daftar Mahasiswa</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>NIM</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mahasiswa, index) in mahasiswaList" :key="mahasiswa.id">
          <td>{{ index + 1 }}</td>
          <td>{{ mahasiswa.nama }}</td>
          <td>{{ mahasiswa.nim }}</td>
          <td>
            <button class="btn btn-primary" @click="viewKRS(mahasiswa.nim)">Lihat KRS</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal untuk menampilkan detail KRS -->
    <div class="modal fade" id="krsModal" tabindex="-1" aria-labelledby="krsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="krsModalLabel">Detail KRS Mahasiswa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5>Data Matakuliah</h5>
            <table class="table table-striped" v-for="(matakuliah, semester) in krsData.matkul" :key="semester">
              <thead>
                <tr>
                  <th>Mata Kuliah</th>
                  <th>Semester</th>
                  <th>SKS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(matkul, semester) in matakuliah" :key="semester">
                <!-- <tr> -->
                  <td>{{ matkul.nama_matakuliah }}</td>
                  <td>{{ matkul.sks }}</td> 
                  <td>{{ matkul.sks }}</td>
                </tr>
              </tbody>
            </table>

            <h5 class="mt-4">IPS dan IPK</h5>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>IPS</th>
                  <th>IPK</th>
                </tr>
              </thead>
              <tbody>
                <tr tr v-for="(Ips, semester) in krsData.ips" :key="semester">
                  <td>{{ semester }}</td>
                  <td>{{ Ips }}</td>
                  <td>{{ krsData.ipk }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mahasiswaList: [], // Data mahasiswa
      krsData: {}, // Data KRS, IPS, IPK
    };
  },
  methods: {
    async fetchMahasiswa() {
      try {
        const response = await axios.get('https://pplsemester7-b3d65daf7234.herokuapp.com/mahasiswa');
        this.mahasiswaList = response.data;
      } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
      }
    },
    async viewKRS(nim) {
      try {
        // Mengambil data KRS berdasarkan NIM mahasiswa
        const response = await axios.get(`https://pplsemester7-b3d65daf7234.herokuapp.com/ipk/${nim}`);
        // this.krsData = response.data;

        this.krsData = {
          ips: response.data.ips.ips,
          ipk: response.data.ipk,
          matkul: response.data.ips.matakuliah,
        }

        // Menampilkan modal
        const modal = new window.bootstrap.Modal(document.getElementById('krsModal'));
        modal.show();
      } catch (error) {
        console.error('Gagal mengambil data KRS:', error);
      }
    },
  },
  mounted() {
    this.fetchMahasiswa(); // Memanggil data mahasiswa saat komponen dimuat
  },
};
</script>