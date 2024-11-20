document.addEventListener('DOMContentLoaded', function () {
    const app = document.createElement('div');
    app.className = 'container mt-2 shadow-lg rounded';
    document.body.appendChild(app);
  
    const title = document.createElement('h2');
    title.className = 'mb-4';
    title.textContent = 'Daftar Mahasiswa';
    app.appendChild(title);
  
    // Table
    const table = document.createElement('table');
    table.className = 'table table-bordered';
    table.id = 'mahasiswaTable';
  
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>NIM</th>
        <th>Aksi</th>
      </tr>
    `;
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    app.appendChild(table);
  
    // Modal
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.id = 'krsModal';
    modalDiv.setAttribute('tabindex', '-1');
    modalDiv.setAttribute('aria-labelledby', 'krsModalLabel');
    modalDiv.setAttribute('aria-hidden', 'true');
  
    modalDiv.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="krsModalLabel">Detail KRS Mahasiswa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5>Data Matakuliah</h5>
            <table class="table table-striped" id="matakuliahTable">
              <thead>
                <tr>
                  <th>Mata Kuliah</th>
                  <th>Semester</th>
                  <th>SKS</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <h5 class="mt-4">IPS dan IPK</h5>
            <table class="table table-bordered" id="ipsIpkTable">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>IPS</th>
                  <th>IPK</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);
  
    const mahasiswaTable = tbody;
    const matakuliahTable = modalDiv.querySelector('#matakuliahTable tbody');
    const ipsIpkTable = modalDiv.querySelector('#ipsIpkTable tbody');
  
    let mahasiswaList = [];
    let krsData = {};
  
    async function fetchMahasiswa() {
      try {
        const response = await axios.get('https://pplsemester7-b3d65daf7234.herokuapp.com/mahasiswa');
        mahasiswaList = response.data;
        renderMahasiswa();
      } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
      }
    }
  
    function renderMahasiswa() {
      mahasiswaTable.innerHTML = '';
      mahasiswaList.forEach((mahasiswa, index) => {
        const row = mahasiswaTable.insertRow();
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${mahasiswa.nama}</td>
          <td>${mahasiswa.nim}</td>
          <td><button class="btn btn-primary" onclick="viewKRS('${mahasiswa.nim}')">Lihat KRS</button></td>
        `;
      });
    }
  
    async function viewKRS(nim) {
      try {
        const response = await axios.get(`https://pplsemester7-b3d65daf7234.herokuapp.com/ipk/${nim}`);
        krsData = {
          ips: response.data.ips.ips,
          ipk: response.data.ipk,
          matkul: response.data.ips.matakuliah,
        };
        renderKRS();
        const modal = new bootstrap.Modal(document.getElementById('krsModal'));
        modal.show();
      } catch (error) {
        console.error('Gagal mengambil data KRS:', error);
      }
    }
  
    function renderKRS() {
      matakuliahTable.innerHTML = '';
      krsData.matkul.forEach((matakuliah, semester) => {
        const row = matakuliahTable.insertRow();
        row.innerHTML = `
          <td>${matakuliah.nama_matakuliah}</td>
          <td>${semester}</td>
          <td>${matakuliah.sks}</td>
        `;
      });
  
      ipsIpkTable.innerHTML = '';
      Object.keys(krsData.ips).forEach((semester) => {
        const row = ipsIpkTable.insertRow();
        row.innerHTML = `
          <td>${semester}</td>
          <td>${krsData.ips[semester]}</td>
          <td>${krsData.ipk}</td>
        `;
      });
    }
  
    fetchMahasiswa();
  });
  